import { WordleWord } from "./WordleWord";

export class WordleHistory {
  letterCount: number;
  words: WordleWord[] = [];

  completeWords() {
    return this.words.filter((w) => w.isComplete());
  }

  constructor(letterCount: number) {
    this.letterCount = letterCount;
  }

  addWord() {
    var word = new WordleWord(this.letterCount);
    this.words.push(word);
    return word;
  }

  removeWord(index: number) {
    this.words.splice(index, 1);
  }
}
