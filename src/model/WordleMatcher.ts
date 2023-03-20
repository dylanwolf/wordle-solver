import "../helpers";
import { WordleHistory } from "./WordleHistory";
import { LetterState } from "./WordleLetter";
import { WORDLIST } from "./wordlist";

export function getMatchingWords(model: WordleHistory) {
  if (model.words.filter((w) => w.isComplete()).length === 0) return [];

  var initialRegex = createInitialRegex(model);

  var matches = WORDLIST.filter((word) => word.match(initialRegex));

  var allYellowLetters = getAllLettersOfType(model, LetterState.Yellow);

  return matches.filter(
    (word) => allYellowLetters.filter((l) => !word.includes(l)).length === 0
  );
}

function getAllLettersOfType(model: WordleHistory, letterState: LetterState) {
  return model
    .completeWords()
    .map((w) =>
      w.letters
        .filter((l) => l.state === letterState && l.letter !== null)
        .map((l) => l.letter?.toLowerCase() || "")
    )
    .flat()
    .distinct();
}

export function createInitialRegex(model: WordleHistory) {
  var result: string[] = [];

  var allGreenLetters = getAllLettersOfType(model, LetterState.Green);
  var allYellowLetters = getAllLettersOfType(model, LetterState.Yellow);

  // If a letter is entered twice, it might be yellow the first time and gray the second
  // In that case, remove it from gray letters
  var grayLetters = getAllLettersOfType(model, LetterState.Gray).filter(
    (l) => !allYellowLetters.includes(l) && !allGreenLetters.includes(l)
  );

  for (var i = 0; i < model.letterCount; i++) {
    var greenLetter =
      model
        .completeWords()
        .filter(
          (w) =>
            w.letters[i].letter !== null &&
            w.letters[i].state === LetterState.Green
        )
        .map((w) => w.letters[i].letter || "")[0] || null;

    if (greenLetter !== null) {
      // If there is a green letter, it's the only thing this letter can be
      result.push(greenLetter);
    } else {
      // Otherwise, this can be anything other than a gray letter or a yellow letter in this slot
      var yellowLetters = model
        .completeWords()
        .filter(
          (w) =>
            w.letters[i].letter !== null &&
            w.letters[i].state === LetterState.Yellow
        )
        .map((w) => w.letters[i].letter || "");

      var excludedLetters = grayLetters.concat(yellowLetters).distinct();

      result.push(`[^${excludedLetters.join("")}]`);
    }
  }

  return result.join("").toLowerCase();
}
