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
  origin: '*', // 배포 환경에서는 모든 origin 허용
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// OPTIONS 요청 처리 (CORS preflight)
app.options('/api/analyze', (req, res) => {
  res.status(200).end();
});

// 루트 경로 (Railway health check용)
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Oneway Lover API Server is running',
    endpoints: {
      health: '/health',
      analyze: '/api/analyze'
    }
  });
});

// 헬스체크 엔드포인트
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// ChatGPT API를 통한 분석 엔드포인트
app.post('/api/analyze', async (req, res) => {
  try {
    const { answers, typeCode, typeInfo } = req.body;

    if (!answers || !typeCode || !typeInfo) {
      return res.status(400).json({ 
        error: '필수 정보가 누락되었습니다.',
        analysis: null
      });
    }

    const aiAnalysis = await analyzeAnswers(answers, typeCode, typeInfo);

    if (!aiAnalysis) {
      return res.status(500).json({ 
        error: 'AI 분석 결과를 생성하지 못했습니다.',
        analysis: null
      });
    }

    res.status(200).json({ 
      analysis: aiAnalysis,
      success: true
    });
  } catch (error) {
    console.error('AI 분석 오류:', error);
    res.status(500).json({ 
      error: 'AI 분석 중 오류가 발생했습니다.',
      details: error.message,
      analysis: null
    });
  }
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error('서버 오류:', err);
  res.status(500).json({ 
    error: '서버 내부 오류가 발생했습니다.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({ error: '요청한 경로를 찾을 수 없습니다.' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`헬스체크: http://0.0.0.0:${PORT}/health`);
});

// 프로세스 종료 시 서버 정리
process.on('SIGTERM', () => {
  console.log('SIGTERM 신호 수신, 서버 종료 중...');
  server.close(() => {
    console.log('서버가 정상적으로 종료되었습니다.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT 신호 수신, 서버 종료 중...');
  server.close(() => {
    console.log('서버가 정상적으로 종료되었습니다.');
    process.exit(0);
  });
});

