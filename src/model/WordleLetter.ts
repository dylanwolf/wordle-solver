import { action, computed, makeAutoObservable } from "mobx";
import { WordleWord } from "./WordleWord";

export enum LetterState {
  Gray,
  Yellow,
  Green,
}

export class WordleLetter {
  parent: WordleWord;
  letter: string | null = null;
  state: LetterState = LetterState.Gray;

  constructor(parent: WordleWord) {
    this.parent = parent;
    makeAutoObservable(this);
  }

  @computed get isLastLetter() {
    return this.letterIndex === this.parent.parent.letterCount - 1;
  }

  @computed get isFirstLetterOfFirstWord() {
    return this.letterIndex === 0 && this.parent.wordIndex === 0;
  }

  @computed get isLastLetterOfLastWord() {
    return this.isLastLetter && this.parent.isLastWord;
  }

  @computed get letterIndex() {
    return this.parent.letters.indexOf(this);
  }

  @action setLetter(newValue: string) {
    this.letter = newValue;
  }

  @action setLetterState(newValue: LetterState) {
    this.state = newValue;
  }
}
