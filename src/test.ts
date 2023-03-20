import { WordleHistory } from "./model/WordleHistory";
import { LetterState } from "./model/WordleLetter";
import { createInitialRegex, getMatchingWords } from "./model/WordleMatcher";

var model = new WordleHistory(5);

var word = model.addWord();
word.letters[0].letter = "a";
word.letters[1].letter = "n";
word.letters[2].letter = "i";
word.letters[3].letter = "m";
word.letters[4].letter = "e";
word.letters[0].state = LetterState.Green;
word.letters[4].state = LetterState.Yellow;

word = model.addWord();
word.letters[0].letter = "a";
word.letters[1].letter = "r";
word.letters[2].letter = "e";
word.letters[3].letter = "a";
word.letters[4].letter = "s";
word.letters[0].state = LetterState.Green;
word.letters[2].state = LetterState.Yellow;

word = model.addWord();
word.letters[0].letter = "a";
word.letters[1].letter = "l";
word.letters[2].letter = "l";
word.letters[3].letter = "e";
word.letters[4].letter = "y";
word.letters[0].state = LetterState.Green;
word.letters[3].state = LetterState.Green;
word.letters[4].state = LetterState.Green;

var regex1 = createInitialRegex(model);

console.log(regex1);

console.log(getMatchingWords(model));
