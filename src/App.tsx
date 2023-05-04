import './App.css';
import { WordleModel } from './model/WordleModel';
import { WordleWordList } from './components/WordleWordList';
import { WordleResultList } from './components/WordleResultList';

const LETTERS = 5
var model = new WordleModel(LETTERS)

export interface ViewModelProps {
  viewModel: WordleModel
}

function App() {
  return (
    <div className="App">
      <div className="input-list">
        <WordleWordList viewModel={model} />
      </div>
      <div className="result-list">
        <WordleResultList viewModel={model} />
      </div>
    </div>
  );
}

export default App;
