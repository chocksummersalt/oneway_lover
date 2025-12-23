import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeAnswers } from './ai-service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 설정 - 배포 환경을 위한 설정
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // origin이 없거나 허용된 origin이면 통과
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // 개발 중에는 모든 origin 허용
    }
  },
  credentials: true
}));
app.use(express.json());

// ChatGPT API를 통한 분석 엔드포인트
app.post('/api/analyze', async (req, res) => {
  try {
    const { answers, typeCode, typeInfo } = req.body;

    if (!answers || !typeCode || !typeInfo) {
      return res.status(400).json({ error: '필수 정보가 누락되었습니다.' });
    }

    const aiAnalysis = await analyzeAnswers(answers, typeCode, typeInfo);

    res.json({ analysis: aiAnalysis });
  } catch (error) {
    console.error('AI 분석 오류:', error);
    res.status(500).json({ 
      error: 'AI 분석 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

