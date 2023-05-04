import { action, computed, makeAutoObservable } from "mobx";
import { WordleHistory } from "./WordleHistory";
import { getMatchingWords } from "./WordleMatcher";

export class WordleModel {
  letterCount: number;
  history: WordleHistory;

  constructor(letterCount: number) {
    makeAutoObservable(this);
    this.letterCount = letterCount;
    this.history = new WordleHistory(this.letterCount);
    this.history.addWord();
  }

  @action reset() {
    this.history = new WordleHistory(this.letterCount);
    this.history.addWord();
  }

  @computed get results() {
    return getMatchingWords(this.history);
  }
}
