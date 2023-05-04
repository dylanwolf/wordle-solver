import { action, computed, makeAutoObservable } from "mobx";
import { WordleLetter } from "./WordleLetter";
import { WordleHistory } from "./WordleHistory";

export class WordleWord {
  parent: WordleHistory;
  letters: WordleLetter[];

  constructor(letterCount: number, parent: WordleHistory) {
    makeAutoObservable(this);
    this.parent = parent;
    this.letters = [];

    for (var i = 0; i < letterCount; i++) {
      this.letters.push(new WordleLetter(this));
    }
  }

  @computed get isLastWord() {
    return this.parent.words.length - 1 === this.wordIndex;
  }

  @computed get wordIndex() {
    return this.parent.words.indexOf(this);
  }

  @computed get isComplete() {
    return this.letters.filter((l) => l.letter === null).length === 0;
  }

  @action remove() {
    if (this.wordIndex === 0) return;
    this.parent.removeWord(this);
  }
}
