import { KeyboardEvent, KeyboardEventHandler, useRef } from "react"
import { LetterState, WordleLetter } from "../model/WordleLetter"
import { observer } from "mobx-react-lite"

interface WordleLetterComponentProps {
    viewModel: WordleLetter
}

interface WordleLetterComponentSwatchProps {
    state: LetterState
    letter: WordleLetter
    focusTextBox: () => void
}


const WordleLetterComponentSwatch = observer((props: WordleLetterComponentSwatchProps) => {
    const onClick = function () {
        props.letter.setLetterState(props.state)
        props.focusTextBox()
    }

    return <div className={`wordle-swatch wordle-swatch-${props.state.toString()}`}
        onClick={onClick}>{(props.state + 1).toString()}</div>
})

export const WordleLetterComponent = observer((props: WordleLetterComponentProps) => {
    const letter = props.viewModel

    const onTextBoxKeyDown: KeyboardEventHandler<HTMLInputElement> = (e: KeyboardEvent) => {
        if (!e.altKey && !e.ctrlKey && !e.metaKey) {
            if (e.key.length === 1 && ((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z'))) {
                // Letter key = set letter
                letter.setLetter(e.key)
                focusNext()
            } else if (e.key.length === 1 && e.key >= '1' && e.key <= '3') {
                // 1-3 = set state
                letter.setLetterState(parseInt(e.key) - 1)
            } else if (e.key === 'Enter' || e.key === 'Tab') {
                if (letter.isLastLetterOfLastWord) {
                    letter.parent.parent.addWord()
                    setTimeout(focusNext, 10)
                } else {
                    focusNext()
                }
            } else if (e.key === 'Delete') {
                letter.parent.remove()
            }

            e.preventDefault()
            return false
        }
    }

    function focusNext() {
        if (!inputRef.current) return;

        var inputElements = document.getElementsByTagName('input')
        var idx = Array.prototype.indexOf.call(inputElements, inputRef.current)
        if (inputElements[idx + 1]) inputElements[idx + 1].focus()
    }

    function onStateChange(state: LetterState) {
        letter.setLetterState(state)
        focusTextBox()
    }

    function focusTextBox() {
        if (inputRef.current) inputRef.current.focus()
    }

    const inputRef = useRef<HTMLInputElement>(null);

    return <div className="wordle-letter">
        <div className={`wordle-letter-text wordle-swatch-${letter.state.toString()}`}>
            <input type="text"
                autoFocus={letter.isFirstLetterOfFirstWord ? true : undefined}
                ref={inputRef}
                value={letter.letter?.toUpperCase() || ''}
                maxLength={1}
                onKeyDown={onTextBoxKeyDown} />
        </div>
        <div className="wordle-letter-swatches">
            <WordleLetterComponentSwatch state={LetterState.Gray} focusTextBox={focusTextBox} letter={letter} />
            <WordleLetterComponentSwatch state={LetterState.Yellow} focusTextBox={focusTextBox} letter={letter} />
            <WordleLetterComponentSwatch state={LetterState.Green} focusTextBox={focusTextBox} letter={letter} />
        </div>
    </div>

})