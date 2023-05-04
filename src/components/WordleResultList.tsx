import { observer } from "mobx-react-lite"
import { ViewModelProps } from "../App"

export const WordleResultList = observer((props: ViewModelProps) => {
    const words = props.viewModel.results

    if (words.length === 0) {
        return <div className="results-flex"><div className="no-result-item">(No results)</div></div>
    }

    return <div className="results-flex">
        {words.map(word => <div className="result-item">
            {word}
        </div>)}
    </div>
})