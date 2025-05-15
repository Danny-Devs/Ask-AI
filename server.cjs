/**
 * Express server
 */

// Import dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Server configuration
const PORT = 3000
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())


const { OpenAI } = require('openai')

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.post('/chat', async (req, res) => {
  const messages = req.body.messages
  console.log(messages)
  try {
    if (!messages) {
      throw new Error('No prompt provided')
    }
    
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages
    })

    const completion = response.choice[0].messages
    return res.status(200).json({
      success: true,
      message: completion
    })
  } catch (error) {
    console.log(error.message)
  }

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
