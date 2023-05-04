import { MouseEventHandler, useContext, useState } from "react"
import { WordleWordComponent } from "./WordleWordComponent"
import { ViewModelProps } from "../App"
import { observer } from "mobx-react-lite"

export const WordleWordList = observer((props: ViewModelProps) => {
    const history = props.viewModel.history

    return <div className="wordle-word-list">
        {history.words.map((word, wordIdx) => <WordleWordComponent viewModel={word} key={wordIdx} />)}
        <div className="add-word">
            <a href="#" onClick={function () { history.addWord() }}>Add Word</a>&nbsp;|&nbsp;
            <a href="#" onClick={function () { props.viewModel.reset() }}>Restart</a>
        </div>
    </div>
})