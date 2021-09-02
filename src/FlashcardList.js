import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList(props) {
    return (
        <div className="card-grid">
           {props.quizList.map(eachQuiz => (
            <Flashcard eachQuiz={eachQuiz} key={eachQuiz.id} />
           ))} 
        </div>
    )
}
