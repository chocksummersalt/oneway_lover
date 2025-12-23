import { useState } from 'react'
import { loveTypes } from '../data/types'
import './Result.css'

function Result({ typeCode, answers, onRestart }) {
  const type = loveTypes[typeCode]
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAiAnalysis = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          typeCode,
          typeInfo: type,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'AI 분석 요청 실패')
      }

      const data = await response.json()
      setAiAnalysis(data.analysis)
    } catch (err) {
      setError(err.message)
      console.error('AI 분석 오류:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!type) {
    return (
      <div className="result">
        <p>결과를 찾을 수 없습니다.</p>
        <button onClick={onRestart}>다시 시작하기</button>
      </div>
    )
  }

  return (
    <div className="result">
      <div className="result-card">
        <div className="result-header">
          <h2 className="result-title">당신의 짝사랑 타입은</h2>
          <h1 className="result-type-name">{type.name}</h1>
          <p className="result-description">{type.description}</p>
        </div>

        <div className="result-detail">
          <h3>상세 설명</h3>
          <p>{type.detail}</p>
        </div>

        <div className="result-traits">
          <h3>특징</h3>
          <div className="traits-list">
            {type.traits.map((trait, index) => (
              <span key={index} className="trait-badge">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* AI 분석 섹션 */}
        <div className="ai-analysis-section">
          <h3>🤖 AI 맞춤 조언</h3>
          {!aiAnalysis && !isLoading && !error && (
            <button 
              className="ai-button"
              onClick={handleAiAnalysis}
            >
              AI 분석 받기
            </button>
          )}
          
          {isLoading && (
            <div className="ai-loading">
              <div className="spinner"></div>
              <p>AI가 당신의 답변을 분석하고 있어요...</p>
            </div>
          )}
          
          {error && (
            <div className="ai-error">
              <p>⚠️ {error}</p>
              <button 
                className="retry-button"
                onClick={handleAiAnalysis}
              >
                다시 시도
              </button>
            </div>
          )}
          
          {aiAnalysis && (
            <div className="ai-analysis-content">
              <p>{aiAnalysis}</p>
            </div>
          )}
        </div>

        <div className="result-actions">
          <button className="restart-button" onClick={onRestart}>
            다시 테스트하기
          </button>
          <button 
            className="share-button"
            onClick={() => {
              const text = `나의 짝사랑 타입: ${type.name}\n${type.description}\n\n짝사랑 타입 테스트: ${window.location.href}`
              navigator.clipboard.writeText(text).then(() => {
                alert('결과가 클립보드에 복사되었습니다!')
              })
            }}
          >
            결과 공유하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Result

