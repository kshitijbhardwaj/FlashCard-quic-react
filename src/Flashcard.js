import React, { useEffect, useRef, useState } from 'react'

export default function Flashcard(props) {
    const [flip, setflip] = useState(false);
    const [height, setHeight] = useState('initial');

    const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [props.eachQuiz.question, props.eachQuiz.answer,props.eachQuiz.options])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])
    return (
        <div className={`card ${flip ? "flip" : ""}`}
        style={{height: height}}
        onClick={() => setflip(!flip)}>
            <div className="front" ref={frontEl}>
            {props.eachQuiz.question}
            <div className="options">{props.eachQuiz.options.map(option => (
                <div className="option">{option}</div>
            ))}</div>
            </div>
            <div className="back" ref={backEl}>{props.eachQuiz.answer}</div>
        </div>
    )
}
