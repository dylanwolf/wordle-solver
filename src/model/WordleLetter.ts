export enum LetterState {
  Gray,
  Yellow,
  Green,
}

export class WordleLetter {
  letter: string | null = null;
  state: LetterState = LetterState.Gray;
}
