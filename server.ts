import express from 'express';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';

import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { UNIVERSITIES, COURSES } from './src/data/universitiesData.js';

dotenv.config();

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/live' });

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `
You are "CyprusUni Voice Advisor", a friendly, knowledgeable, and highly articulate conversational voice AI assistant for potential international students interested in higher education in North Cyprus (TRNC - Turkish Republic of Northern Cyprus).

Your goal is to inform and guide prospective students about courses, tuition fees, scholarships, campus facilities, admission requirements, living costs, and student visa processes across top North Cyprus universities.

Top Universities Covered:
1. Eastern Mediterranean University (EMU - DAÜ) in Famagusta (Gazimağusa): Top-ranked state university, ABET accredited Engineering, AACSB accredited Business, beachfront campus, 50% automatic international scholarship.
2. Near East University (NEU - YDÜ) in Nicosia (Lefkoşa): Comprehensive Medical & Dental Center, AI Robotics Hub, 2.5M book Grand Library, Günsel Electric Car Lab.
3. Cyprus International University (CIU - UKÜ) in Nicosia (Lefkoşa): Eco-friendly solar campus, UK dual degrees, all-inclusive tuition+dorm+meal packages.
4. Girne American University (GAU) in Kyrenia (Girne): Aviation & Pilot Training, Marine/Nautical Studies, Law, picturesque seaside mountain campus.
5. Bahçeşehir Cyprus University (BAU) in Nicosia: Part of BAU Global Network, Cyber Security, Digital Media, AI.

Key Key Admissions & Financial Rules:
- Automatic 50% International Tuition Merit Scholarship is awarded to almost all qualified international undergraduate applicants!
- Net Annual Tuition Fees (with 50% scholarship):
  * Engineering & Computer Science: ~$2,800 - $3,200 / year
  * Business, Economics & Humanities: ~$2,600 - $2,900 / year
  * Pharmacy (Pharm.D 5 yrs): ~$4,100 / year
  * Medicine (M.D. 6 yrs): ~$7,800 - $10,125 / year
  * Architecture: ~$3,100 / year
  * Pilot Training (B.Sc): ~$3,600 / year tuition (flight hours separate)
- Language: 100% English medium of instruction for international degrees. No mandatory IELTS/TOEFL if student passes university English proficiency test or comes from English-speaking medium background.
- Cost of Living: $300 - $500 USD per month for food, transport, and personal expenses. Campus dorms cost $1,500 - $3,500 per year.
- Visa & Entry: Easy student visa issued upon arrival at Ercan Airport (ECN) or via registration in TRNC. No advance embassy visa needed for most countries.

Voice & Tone Guidelines:
- Keep answers warm, welcoming, clear, informative, concise, and easy to follow when spoken aloud.
- Use natural pauses and friendly phrasing. Avoid overly long walls of text. When asked about specific courses or fees, provide exact numbers and highlight scholarship savings!
`;

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/universities', (_req, res) => {
  res.json({ universities: UNIVERSITIES, courses: COURSES });
});

// Server-side Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({ error: ''Gemini API key is not configured.'' });
      return;
    }

    const contents = [];
    if (Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a response at this time.";
    res.json({ text: replyText });
  } catch (error: unknown) {
    console.error('Gemini Chat Error:', error);
    const errMessage = error instanceof Error ? error.message : 'Failed to generate chat response';
    res.status(500).json({ error: errMessage });
  }
});

// Server-side Gemini Text-To-Speech (TTS) Endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text is required for TTS' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
  res.status(500).json({ error: 'Gemini API key is not configured.' });
  return;
}

    const selectedVoice = voiceName || 'Zephyr';

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      res.status(500).json({ error: 'No audio returned from Gemini TTS' });
      return;
    }

    res.json({ audio: base64Audio, voiceName: selectedVoice });
  } catch (error: unknown) {
    console.error('Gemini TTS Error:', error);
    const errMessage = error instanceof Error ? error.message : 'Failed to generate speech';
    res.status(500).json({ error: errMessage });
  }
});

// Calculate Fees Endpoint
app.post('/api/calculate-fees', (req, res) => {
  const { baseTuition, scholarshipPercent = 50, dormTier = 'standard', includeMealPlan = true } = req.body;

  const tuition = Number(baseTuition) || 6000;
  const discountRate = Number(scholarshipPercent) / 100;
  const netTuition = Math.round(tuition * (1 - discountRate));

  let dormFee = 2200;
  if (dormTier === 'economy') dormFee = 1500;
  if (dormTier === 'suite') dormFee = 3500;

  const mealPlanFee = includeMealPlan ? 1400 : 0;
  const healthInsurance = 180;
  const registrationAndTax = 320;

  const totalFirstYear = netTuition + dormFee + mealPlanFee + healthInsurance + registrationAndTax;

  res.json({
    baseTuition: tuition,
    scholarshipPercent,
    netTuition,
    dormFee,
    mealPlanFee,
    healthInsurance,
    registrationAndTax,
    totalFirstYear,
    installmentFirstSemester: Math.round(totalFirstYear / 2),
    installmentSecondSemester: Math.round(totalFirstYear / 2),
  });
});

// WebSocket Server for Gemini Live Realtime Multimodal Streaming
wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Gemini Live WebSocket');

  let liveSession: unknown = null;
  let isConnectedToGemini = false;

  clientWs.on('message', async (data: Buffer | string) => {
    try {
      const payload = JSON.parse(data.toString());

      // 1. Session Setup Request
      if (payload.type === 'start') {
        const voiceName = payload.voiceName || 'Zephyr';

        try {
          // Connect to Gemini Live session
          liveSession = await ai.live.connect({
            model: 'gemini-3.1-flash-live-preview',
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName } },
              },
              systemInstruction: SYSTEM_INSTRUCTION,
              inputAudioTranscription: {},
              outputAudioTranscription: {},
            },
            callbacks: {
              onmessage: (message: LiveServerMessage) => {
                // Check for user input audio transcription
                const serverContentAny = message.serverContent as (Record<string, unknown> | undefined);
                const userTurnAny = serverContentAny?.userTurn as ({ parts?: Array<{ text?: string }> } | undefined);
                const userTranscript = userTurnAny?.parts?.find((p) => p.text)?.text;
                if (userTranscript && clientWs.readyState === WebSocket.OPEN) {
                  clientWs.send(
                    JSON.stringify({
                      type: 'transcript',
                      speaker: 'user',
                      text: userTranscript,
                    })
                  );
                }

                // Audio chunk from Gemini Live
                const audioPart = message.serverContent?.modelTurn?.parts?.find((p) => p.inlineData?.data);
                if (audioPart && audioPart.inlineData?.data) {
                  if (clientWs.readyState === WebSocket.OPEN) {
                    clientWs.send(
                      JSON.stringify({
                        type: 'audio',
                        data: audioPart.inlineData.data,
                      })
                    );
                  }
                }

                // Check for interrupted speech
                if (message.serverContent?.interrupted) {
                  if (clientWs.readyState === WebSocket.OPEN) {
                    clientWs.send(JSON.stringify({ type: 'interrupted' }));
                  }
                }

                // Check for turn complete / text transcription
                const textPart = message.serverContent?.modelTurn?.parts?.find((p) => p.text);
                if (textPart && textPart.text) {
                  if (clientWs.readyState === WebSocket.OPEN) {
                    clientWs.send(
                      JSON.stringify({
                        type: 'transcript',
                        speaker: 'ai',
                        text: textPart.text,
                      })
                    );
                  }
                }
              },
              onclose: () => {
                console.log('Gemini Live session closed');
                isConnectedToGemini = false;
              },
              onerror: (err) => {
                console.error('Gemini Live error:', err);
                if (clientWs.readyState === WebSocket.OPEN) {
                  clientWs.send(JSON.stringify({ type: 'error', error: err?.message || 'Gemini Live error' }));
                }
              },
            },
          });

          isConnectedToGemini = true;
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'connected', voiceName }));
          }
        } catch (sessionErr: unknown) {
          console.error('Failed to start Gemini Live session:', sessionErr);
          const errMsg = sessionErr instanceof Error ? sessionErr.message : 'Could not connect to Gemini Live service.';
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'error', error: errMsg }));
          }
        }
        return;
      }

      // 2. Realtime Audio Input from Client (16kHz PCM Base64)
      if (payload.type === 'audio' && payload.data && isConnectedToGemini && liveSession) {
        try {
          const sessionObj = liveSession as { sendRealtimeInput: (arg: unknown) => void };
          sessionObj.sendRealtimeInput({
            audio: { data: payload.data, mimeType: 'audio/pcm;rate=16000' },
          });
        } catch (audioErr) {
          console.error('Error forwarding audio to Gemini Live:', audioErr);
        }
        return;
      }

      // 3. Text Prompt Input from Client
      if (payload.type === 'text' && payload.text && isConnectedToGemini && liveSession) {
        try {
          const sessionObj = liveSession as { sendRealtimeInput: (arg: unknown) => void };
          sessionObj.sendRealtimeInput({
            text: payload.text,
          });
        } catch (textErr) {
          console.error('Error forwarding text to Gemini Live:', textErr);
        }
        return;
      }
    } catch (parseErr) {
      console.error('Error handling WS message:', parseErr);
    }
  });

  clientWs.on('close', () => {
    console.log('Client disconnected from WS');
    if (liveSession && typeof (liveSession as { close?: () => void }).close === 'function') {
      (liveSession as { close: () => void }).close();
    }
  });
});

// Vite Development or Production Server Configuration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
