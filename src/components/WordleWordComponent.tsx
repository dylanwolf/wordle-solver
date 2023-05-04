import { observer } from "mobx-react-lite"
import { WordleWord } from "../model/WordleWord"
import { WordleLetterComponent } from "./WordleLetterComponent"

interface WordleWordComponentProps {
    viewModel: WordleWord
}

export const WordleWordComponent = observer((props: WordleWordComponentProps) => {
    const word = props.viewModel

    return <div className="wordle-word">
        {word.letters.map((letter, letterIdx) => <WordleLetterComponent viewModel={letter} />)}
        <div className="remove-word">
            {word.wordIndex !== 0 ? <a onClick={function () { word.remove() }}>&times;</a> : <></>}
        </div>
    </div>
})