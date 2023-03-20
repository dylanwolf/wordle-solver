import { MouseEventHandler, useContext, useState } from "react"
import { WordleModelContext } from "../App"
import { WordleWordComponent } from "./WordleWordComponent"

interface WordleWordListProps {
    updateResults: () => void
    resetList: () => void
}

export function WordleWordList(props: WordleWordListProps) {
    const ctx = useContext(WordleModelContext)

    function updateWordListState() {
        props.updateResults()
    }

    const addWordClicked: MouseEventHandler<HTMLAnchorElement> = function (e) {
        ctx.history.addWord()
        updateWordListState()
        e.preventDefault()
        return false;
    }

    return <div className="wordle-word-list">
        {ctx.history.words.map((word, wordIdx) => <WordleWordComponent wordIndex={wordIdx} key={wordIdx} updateResults={updateWordListState} />)}
        <div className="add-word">
            <a href="#" onClick={addWordClicked}>Add Word</a>&nbsp;|&nbsp;
            <a href="#" onClick={props.resetList}>Restart</a>
        </div>
    </div>
}