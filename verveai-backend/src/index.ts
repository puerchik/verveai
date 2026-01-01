import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// 🔒 Безопасность с первого дня
app.use(helmet()) // Защита от XSS, clickjacking и др.
app.use(
  cors({
    origin: ['http://localhost:5173'], // Только твой фронтенд
    optionsSuccessStatus: 200,
  })
)
app.use(express.json({ limit: '10kb' })) // Защита от больших payload

// 🛑 Временный эндпоинт — только эхо (без ИИ пока)
app.post('/api/review', (req, res) => {
  const code = req.body?.code?.substring(0, 50) || ''
  console.log(`[VerveAI Backend] Received code snippet: ${code}...`)

  // ⚠️ Никаких внешних вызовов — только безопасный ответ
  res.json({
    analysis: '[VerveAI] ✨ This is a placeholder. Real AI analysis coming soon!',
  })
})

app.listen(PORT, () => {
  console.log(`✅ VerveAI Backend running on http://localhost:${PORT}`)
})
