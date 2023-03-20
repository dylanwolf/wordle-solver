import { KeyboardEvent, KeyboardEventHandler, useContext, useEffect, useRef, useState } from "react"
import { WordleModelContext } from "../App"
import { LetterState, WordleLetter } from "../model/WordleLetter"

interface WordleLetterComponentProps {
    wordIndex: number
    updateResults: () => void
    letterIndex: number
}

interface WordleLetterComponentSwatchProps {
    state: LetterState
    onClick: (state: LetterState) => void
}

function WordleLetterComponentSwatch(props: WordleLetterComponentSwatchProps) {
    return <div className={`wordle-swatch wordle-swatch-${props.state.toString()}`}
        onClick={function () { props.onClick(props.state) }}>{(props.state + 1).toString()}</div>
}

export function WordleLetterComponent(props: WordleLetterComponentProps) {
    const ctx = useContext(WordleModelContext)
    const letter = ctx.history.words[props.wordIndex].letters[props.letterIndex]
    const [forceRefresh, setForceRefresh] = useState(false)

    function updateComponent() {
        props.updateResults()
    }

    const onTextBoxKeyDown: KeyboardEventHandler<HTMLInputElement> = (e: KeyboardEvent) => {
        if (!e.altKey && !e.ctrlKey && !e.metaKey) {
            if (e.key.length === 1 && ((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z'))) {
                // Letter key = set letter
                ctx.setLetter(props.wordIndex, props.letterIndex, e.key)
                updateComponent()
                focusNext()
            } else if (e.key.length === 1 && e.key >= '1' && e.key <= '3') {
                // 1-3 = set state
                ctx.setLetterState(props.wordIndex, props.letterIndex, parseInt(e.key) - 1)
                updateComponent()
            } else if (e.key === 'Enter' || e.key === 'Tab') {
                if (props.letterIndex === ctx.history.letterCount - 1 && props.wordIndex === ctx.history.words.length - 1) {
                    ctx.history.addWord()
                    updateComponent()
                    setTimeout(focusNext, 10)
                } else {
                    focusNext()
                }
            } else if (e.key === 'Delete' && props.wordIndex !== 0) {
                ctx.history.removeWord(props.wordIndex)
                updateComponent()
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
        ctx.setLetterState(props.wordIndex, props.letterIndex, state)
        updateComponent()
        focusTextBox()
    }

    function focusTextBox() {
        if (inputRef.current) inputRef.current.focus()
    }

    const inputRef = useRef<HTMLInputElement>(null);

    return <div className="wordle-letter">
        <div className={`wordle-letter-text wordle-swatch-${letter.state.toString()}`}>
            <input type="text"
                autoFocus={props.wordIndex === 0 && props.letterIndex === 0 ? true : undefined}
                ref={inputRef}
                value={letter.letter?.toUpperCase() || ''}
                maxLength={1}
                onKeyDown={onTextBoxKeyDown} />
        </div>
        <div className="wordle-letter-swatches">
            <WordleLetterComponentSwatch state={LetterState.Gray} onClick={onStateChange} />
            <WordleLetterComponentSwatch state={LetterState.Yellow} onClick={onStateChange} />
            <WordleLetterComponentSwatch state={LetterState.Green} onClick={onStateChange} />
        </div>
    </div>

}