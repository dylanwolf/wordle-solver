import { action, computed, makeAutoObservable } from "mobx";
import { WordleWord } from "./WordleWord";

export class WordleHistory {
  letterCount: number;
  words: WordleWord[] = [];

  @computed get completeWords() {
    return this.words.filter((w) => w.isComplete);
  }

  constructor(letterCount: number) {
    makeAutoObservable(this);
    this.letterCount = letterCount;
  }

  @action addWord() {
    var word = new WordleWord(this.letterCount, this);
    this.words.push(word);
    return word;
  }

  @action removeWord(word: WordleWord) {
    var idx = this.words.indexOf(word);
    if (idx === -1) return;
    this.words.splice(idx, 1);
  }
}
