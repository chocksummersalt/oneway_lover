# 🚀 배포 가이드

이 프로젝트를 다른 사람들과 공유할 수 있도록 배포하는 방법입니다.

## 배포 구조

- **프론트엔드**: Vercel (무료, 빠른 배포)
- **백엔드**: Railway 또는 Render (무료 티어 제공)

---

## 1단계: 백엔드 배포 (Railway 추천)

### Railway 사용하기

1. **Railway 계정 생성**
   - https://railway.app 접속
   - GitHub 계정으로 로그인

2. **프로젝트 배포**
   - "New Project" 클릭
   - "Deploy from GitHub repo" 선택
   - 이 저장소 선택

3. **환경 변수 설정**
   - 프로젝트 설정 → Variables
   - 다음 변수 추가:
     ```
     OPENAI_API_KEY=your_openai_api_key
     PORT=3001
     ```

4. **도메인 확인**
   - Settings → Generate Domain
   - 생성된 URL 복사 (예: `https://your-app.railway.app`)

### Render 사용하기 (대안)

1. **Render 계정 생성**
   - https://render.com 접속
   - GitHub 계정으로 로그인

2. **새 Web Service 생성**
   - "New +" → "Web Service"
   - GitHub 저장소 연결
   - 설정:
     - Build Command: `npm install`
     - Start Command: `node server/index.js`
     - Environment: `Node`

3. **환경 변수 설정**
   - Environment Variables 섹션에서:
     ```
     OPENAI_API_KEY=your_openai_api_key
     PORT=10000
     ```

4. **도메인 확인**
   - 배포 완료 후 생성된 URL 확인

---

## 2단계: 프론트엔드 배포 (Vercel)

1. **Vercel 계정 생성**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **프로젝트 배포**
   - "Add New..." → "Project"
   - GitHub 저장소 선택
   - Framework Preset: **Vite** 선택
   - Root Directory: `.` (기본값)

3. **환경 변수 설정**
   - Settings → Environment Variables
   - 다음 변수 추가:
     ```
     VITE_API_URL=https://onewaylover-production.up.railway.app
     ```
   - Environment: Production, Preview, Development 모두 선택

4. **배포**
   - "Deploy" 클릭
   - 배포 완료 후 URL 확인 (예: `https://your-app.vercel.app`)

---

## 3단계: 로컬에서 테스트

배포 전에 로컬에서 빌드 테스트:

```bash
# 프론트엔드 빌드
npm run build

# 빌드 결과 확인
npm run preview
```

---

## 환경 변수 요약

### 백엔드 (Railway/Render)
```
OPENAI_API_KEY=sk-...
PORT=3001 (또는 Render의 경우 10000)
```

### 프론트엔드 (Vercel)
```
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 배포 후 확인사항

1. ✅ 프론트엔드 URL 접속 확인
2. ✅ 설문 완료 후 결과 확인
3. ✅ "AI 분석 받기" 버튼 클릭하여 API 연결 확인

---

## 문제 해결

### CORS 오류 발생 시
백엔드 서버의 `server/index.js`에서 CORS 설정 확인:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}));
```

### API 연결 실패 시
1. 백엔드 URL이 올바른지 확인
2. 환경 변수 `VITE_API_URL`이 설정되었는지 확인
3. 브라우저 개발자 도구의 Network 탭에서 요청 확인

---

## 무료 배포 옵션 비교

| 플랫폼 | 프론트엔드 | 백엔드 | 무료 티어 |
|--------|-----------|--------|----------|
| Vercel | ✅ | ❌ | ✅ |
| Railway | ❌ | ✅ | ✅ (제한적) |
| Render | ❌ | ✅ | ✅ (제한적) |
| Netlify | ✅ | ❌ | ✅ |

---

## 공유하기

배포가 완료되면 프론트엔드 URL을 공유하면 됩니다!
예: `https://your-app.vercel.app`

