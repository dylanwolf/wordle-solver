import { WordleLetter } from "./WordleLetter";

export class WordleWord {
  letters: WordleLetter[];

  constructor(letterCount: number) {
    this.letters = [];
    for (var i = 0; i < letterCount; i++) {
      this.letters.push(new WordleLetter());
    }
  }

  isComplete() {
    return this.letters.filter((l) => l.letter === null).length === 0;
  }
}
