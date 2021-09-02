import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import FlashcardHeader from './FlashcardHeader';
import FlashcardList from './FlashcardList';

function App() {
   const [quizList, setquizList] = useState([]);
   const [categories, setCategories] = useState([]);

   const categoryEl = useRef()
   const amountEl = useRef()

  useEffect(() => {
      getCategories();
  }, [])

  async function getCategories() {
    await axios.get('https://opentdb.com/api_category.php').then(res => {
      console.log(res);
      setCategories(res.data.trivia_categories)
    });
  }

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }
async function submitForm(e){
  e.preventDefault();
  await axios.get('https://opentdb.com/api.php', {
    params: {
      amount: amountEl.current.value,
      category: categoryEl.current.value
    }
    }).then(res => {
      console.log(res);
      setquizList(res.data.results.map(eachval => {
        const answer = eachval.correct_answer;
        const options = [...eachval.incorrect_answers, answer];
        return {
          id: Date.now(),
          question: decodeString(eachval.question),
          options: options.sort(() => Math.random - .5),
          answer: decodeString(answer)
        }
      }))
      console.log(quizList);
    }
      );
}

  return (
    <div>
  <h2>Flash card Quiz</h2>
  <FlashcardHeader />
  <form className="header" onSubmit={submitForm}>
      <div className="form-group">
      <label htmlFor="category">Choose a category:</label>
        <select id="category" ref={categoryEl}>{categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
        </select>
      </div>
      <div className="form-group">
      <label htmlFor="amount">Number of Questions</label>
      <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
      </div>
      <div className="form-group">
          <button className="btn">Generate</button>
      </div>
  </form>
  <FlashcardList className="container" quizList={quizList} />
    </div>
  );
}

export default App;
