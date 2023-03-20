import './App.css';
import { createContext, useState } from 'react';
import { WordleModel } from './model/WordleModel';
import { WordleLetterComponent } from './components/WordleLetterComponent';
import { WordleWordComponent } from './components/WordleWordComponent';
import { WordleWordList } from './components/WordleWordList';
import { getMatchingWords } from './model/WordleMatcher';
import { WordleResultList } from './components/WordleResultList';

const LETTERS = 5
var model = new WordleModel(LETTERS)
export const WordleModelContext = createContext<WordleModel>(model)

function App() {
  const [results, setResults] = useState<string[]>([])

  function restart() {
    model = new WordleModel(LETTERS)
    setResults([])
  }

  function updateResults() {
    setResults(getMatchingWords(model.history) || [])
  }

  return (
    <WordleModelContext.Provider value={model}>
      <div className="App">
        <div className="input-list">
          <WordleWordList updateResults={updateResults} resetList={restart} />
        </div>
        <div className="result-list">
          <WordleResultList words={results} />
        </div>
      </div>
    </WordleModelContext.Provider>
  );
}

export default App;
