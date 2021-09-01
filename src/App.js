import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import FlashcardHeader from './FlashcardHeader';
import FlashcardList from './FlashcardList';

function App() {
   const [quizList, setquizList] = useState([])
  useEffect(() => {
      getquiz();
  }, [])

  async function getquiz() {
    await axios.get('https://opentdb.com/api.php?amount=10').then(res => {
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

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }
  return (
    <div>
  <h2>Flash card Quiz</h2>
  {quizList.map((quiz) => (
    <div>{quiz.question}</div>
  ))}
  <FlashcardHeader />
  <FlashcardList quizList={quizList} />
    </div>
  );
}

export default App;
