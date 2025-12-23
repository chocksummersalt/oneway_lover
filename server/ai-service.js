import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// questions 데이터를 직접 정의 (서버에서 사용)
const questions = [
  {
    id: 1,
    question: '짝사랑을 할 때 당신의 기본적인 태도는?',
    options: [
      { text: '적극적으로 다가가려고 노력한다', value: 'A' },
      { text: '소극적으로 관망하는 편이다', value: 'P' }
    ]
  },
  {
    id: 2,
    question: '감정을 표현하는 방식은?',
    options: [
      { text: '직설적으로 명확하게 표현한다', value: 'D' },
      { text: '간접적으로 힌트를 준다', value: 'I' }
    ]
  },
  {
    id: 3,
    question: '짝사랑 감정을 느끼는 속도는?',
    options: [
      { text: '빠르게 감정이 생긴다', value: 'Q' },
      { text: '천천히 깊어지는 편이다', value: 'S' }
    ]
  },
  {
    id: 4,
    question: '실제 행동으로 옮기는 스타일은?',
    options: [
      { text: '빠르게 행동으로 옮긴다', value: 'O' },
      { text: '신중하게 관찰하며 기다린다', value: 'S' }
    ]
  }
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 사용자의 답변을 분석하여 AI 기반 조언을 제공
 */
export async function analyzeAnswers(answers, typeCode, typeInfo) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY가 설정되지 않았습니다.');
  }

  // 사용자가 선택한 답변들을 텍스트로 변환
  const answerTexts = questions.map((q, index) => {
    const questionId = index + 1;
    const answerValue = answers[questionId];
    const selectedOption = q.options.find(opt => opt.value === answerValue);
    return `질문 ${questionId}: ${q.question}\n답변: ${selectedOption?.text || '답변 없음'}`;
  }).join('\n\n');

  const systemPrompt = `당신은 짝사랑과 연애 심리 전문 상담사입니다. 사용자의 짝사랑 타입과 답변을 분석하여 따뜻하고 실용적인 조언을 제공해주세요. 
답변은 한국어로 작성하며, 친근하고 공감적인 톤을 유지하세요. 
- 사용자의 타입 특성을 긍정적으로 해석
- 구체적이고 실용적인 조언 제공
- 격려와 응원의 메시지 포함
- 300-400자 정도의 분량으로 작성`;

  const userPrompt = `다음은 사용자가 선택한 짝사랑 타입 테스트의 질문과 답변입니다:

${answerTexts}

사용자의 짝사랑 타입: ${typeInfo.name}
타입 설명: ${typeInfo.description}
타입 상세: ${typeInfo.detail}
특징: ${typeInfo.traits.join(', ')}

위 정보를 바탕으로 사용자에게 맞춤형 조언과 격려의 메시지를 작성해주세요. 
사용자의 타입 특성을 이해하고, 그에 맞는 실용적인 조언을 제공해주세요.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API 오류:', error);
    throw new Error(`AI 분석 실패: ${error.message}`);
  }
}

