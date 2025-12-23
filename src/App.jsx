import { useState } from 'react'
import Survey from './components/Survey'
import Result from './components/Result'
import './App.css'

function App() {
  const [result, setResult] = useState(null)
  const [answers, setAnswers] = useState({})

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers)
    // 답변을 조합하여 타입 코드 생성
    const typeCode = (finalAnswers[1] || '') + 
                     (finalAnswers[2] || '') + 
                     (finalAnswers[3] || '') + 
                     (finalAnswers[4] || '')
    
    // 모든 답변이 있는지 확인
    if (typeCode.length !== 4) {
      console.error('타입 코드 생성 실패:', finalAnswers)
      alert('설문을 완료해주세요.')
      return
    }
    
    setResult(typeCode)
  }

  const handleRestart = () => {
    setResult(null)
    setAnswers({})
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>💕 짝사랑 타입 테스트</h1>
          <p className="subtitle">당신의 짝사랑 스타일을 알아보세요</p>
        </header>
        
        {!result ? (
          <Survey onComplete={handleComplete} />
        ) : (
          <Result typeCode={result} answers={answers} onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}

export default App

