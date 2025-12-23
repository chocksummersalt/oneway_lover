# 💕 짝사랑 타입 테스트

16가지 유형의 짝사랑 타입을 알아보는 설문조사 웹사이트입니다. ChatGPT API를 활용하여 사용자의 답변을 분석하고 맞춤형 조언을 제공합니다.

## 주요 기능

- 📝 4가지 질문으로 16가지 짝사랑 타입 진단
- 🤖 ChatGPT API를 활용한 AI 맞춤 조언
- 📱 반응형 디자인 (모바일/데스크톱 지원)
- 🎨 아름다운 그라데이션 UI

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 OpenAI API 키를 입력하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

OpenAI API 키는 [OpenAI Platform](https://platform.openai.com/api-keys)에서 발급받을 수 있습니다.

### 3. 개발 서버 실행

**터미널 1: 프론트엔드 서버**
```bash
npm run dev
```

**터미널 2: 백엔드 서버**
```bash
npm run server
```

### 4. 브라우저에서 접속

- 프론트엔드: http://localhost:5173
- 백엔드 API: http://localhost:3001

## 프로젝트 구조

```
oneway_lover/
├── src/
│   ├── components/
│   │   ├── Survey.jsx      # 설문 컴포넌트
│   │   └── Result.jsx       # 결과 컴포넌트
│   ├── data/
│   │   └── types.js         # 16가지 타입 정의
│   ├── App.jsx              # 메인 앱 컴포넌트
│   └── main.jsx             # 진입점
├── server/
│   ├── index.js             # Express 서버
│   └── ai-service.js        # ChatGPT API 통합
└── package.json
```

## 16가지 짝사랑 타입

4가지 차원을 조합하여 16가지 타입을 생성합니다:

1. **적극적/소극적** (A/P): 다가가는 태도
2. **직설적/간접적** (D/I): 감정 표현 방식
3. **빠른/느린** (Q/S): 감정 형성 속도
4. **행동파/관찰자** (O/S): 행동 스타일

예: `ADQO` = 적극적(A) + 직설적(D) + 빠른(Q) + 행동파(O)

## AI 분석 기능

사용자가 설문을 완료하면 "AI 분석 받기" 버튼을 통해:
- 선택한 답변들을 ChatGPT API에 전송
- 사용자의 타입과 답변을 분석하여 맞춤형 조언 제공
- 따뜻하고 실용적인 조언 메시지 생성

## 빌드

프로덕션 빌드:

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 배포

다른 사람들과 공유하려면 배포가 필요합니다. 자세한 배포 가이드는 [DEPLOY.md](./DEPLOY.md)를 참고하세요.

### 빠른 배포

1. **백엔드**: Railway 또는 Render에 배포
2. **프론트엔드**: Vercel에 배포
3. 환경 변수 설정 후 공유 URL 사용

## 기술 스택

- **Frontend**: React, Vite
- **Backend**: Express.js, Node.js
- **AI**: OpenAI ChatGPT API (gpt-3.5-turbo)
- **Styling**: CSS3 (Gradient, Animations)
- **배포**: Vercel (Frontend), Railway/Render (Backend)

## 라이선스

MIT

