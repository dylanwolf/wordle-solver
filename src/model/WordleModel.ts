import { WordleHistory } from "./WordleHistory";
import { LetterState } from "./WordleLetter";

export class WordleModel {
  history: WordleHistory;

  constructor(letterCount: number) {
    this.history = new WordleHistory(letterCount);
    this.history.addWord();
  }

  setLetter(wordIdx: number, letterIdx: number, newValue: string) {
    this.history.words[wordIdx].letters[letterIdx].letter = newValue;
  }

  setLetterState(wordIdx: number, letterIdx: number, newValue: LetterState) {
    this.history.words[wordIdx].letters[letterIdx].state = newValue;
  }
}
