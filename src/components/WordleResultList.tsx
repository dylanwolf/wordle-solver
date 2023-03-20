interface WordleResultListProps {
    words: string[]
}

export function WordleResultList(props: WordleResultListProps) {
    if (props.words.length === 0) {
        return <div className="results-flex"><div className="no-result-item">(No results)</div></div>
    }

    return <div className="results-flex">
        {props.words.map(word => <div className="result-item">
            {word}
        </div>)}
    </div>
}