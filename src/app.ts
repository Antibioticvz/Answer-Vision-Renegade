import chokidar from 'chokidar'
import * as dotenv from 'dotenv'
import express from 'express'
import path from 'path'

import { handleNewFile } from './fileWatcher'
import { LlamaService } from './llamaService'
import { OpenAIService } from './openaiService'

const app = express()
const imagesDir = path.join(__dirname, process.env.IMAGES_DIR ?? 'images')

// Load environment variables from .env file
dotenv.config()

// Set up services based on the command-line argument
interface Service {
  getAnswerFromText: (text: string) => Promise<string>
}
let service: Service

if (process.env.MODEL === 'openai' && process.env.OPENAI_API_KEY) {
  const openaiService = new OpenAIService(process.env.OPENAI_API_KEY)
  const model = process.env.OPENAI_MODEL
  const systemPrompt = process.env.OPENAI_SYSTEM_PROMPT

  if (!model) throw new Error('OPENAI_MODEL environment variable is not set')
  if (!systemPrompt) throw new Error('OPENAI_SYSTEM_PROMPT environment variable is not set')

  service = {
    getAnswerFromText: async text => {
      const answer = await openaiService.getAnswerFromText(model, systemPrompt, text)
      if (answer === null) {
        throw new Error('Failed to get answer from OpenAI')
      }
      return answer
    },
  }
} else if (process.env.MODEL === 'llama' && process.env.LLAMA_ENDPOINT) {
  const llamaService = new LlamaService(process.env.LLAMA_ENDPOINT)
  const systemPrompt = process.env.LLAMA_SYSTEM_PROMPT

  if (!systemPrompt) throw new Error('LLAMA_SYSTEM_PROMPT environment variable is not set')

  service = {
    getAnswerFromText: async text => llamaService.getAnswerFromText(systemPrompt, text),
  }
}

if (!process.env.MODEL) {
  console.error("Invalid model choice. Please choose 'openai' or 'llama'.")
  process.exit(1)
}

// Watch for changes in the images directory
const watcher = chokidar.watch(imagesDir, {
  persistent: true,
  ignored: /(^|[\/\\])\../,
}) // Exclude hidden files and directories

watcher.on('add', async (imagePath: string) => {
  if (!process.env.TESSERACT_LANG) {
    throw new Error('TESSERACT_LANG environment variable is not set')
  }
  await handleNewFile(imagePath, service, process.env.TESSERACT_LANG)
})

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`)
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n')
})
