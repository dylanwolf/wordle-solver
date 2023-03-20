import { useState, useContext } from "react"
import { WordleModelContext } from "../App"
import { WordleLetterComponent } from "./WordleLetterComponent"

interface WordleWordComponentProps {
    wordIndex: number
    updateResults: () => void
}

export function WordleWordComponent(props: WordleWordComponentProps) {
    const ctx = useContext(WordleModelContext)
    const word = ctx.history.words[props.wordIndex]

    function removeWord() {
        ctx.history.removeWord(props.wordIndex)
        props.updateResults()
    }

    return <div className="wordle-word">
        {word.letters.map((letter, letterIdx) => <WordleLetterComponent
            wordIndex={props.wordIndex}
            letterIndex={letterIdx}
            updateResults={props.updateResults} />)}
        <div className="remove-word">
            {props.wordIndex !== 0 ? <a onClick={removeWord}>&times;</a> : <></>}
        </div>
    </div>
}