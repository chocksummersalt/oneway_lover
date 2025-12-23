import { useState } from 'react'
import { questions } from '../data/types'
import './Survey.css'

function Survey({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="survey">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="question-container">
        <div className="question-number">
          질문 {currentQuestion + 1} / {questions.length}
        </div>
        
        <h2 className="question-text">
          {questions[currentQuestion].question}
        </h2>

        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleAnswer(option.value)}
            >
              {option.text}
            </button>
          ))}
        </div>

        {currentQuestion > 0 && (
          <button className="prev-button" onClick={handlePrevious}>
            ← 이전 질문
          </button>
        )}
      </div>
    </div>
  )
}

export default Survey

