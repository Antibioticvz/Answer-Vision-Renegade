import OpenAI from 'openai'

export class OpenAIService {
  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey })
  }

  async getAnswerFromText(model: string, systemPrompt: string, text: string) {
    try {
      console.log('\x1b[33m Making request to OpenAI model: \x1b[0m')

      const response = await this.openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Select the right answer from the given text: ${text}`,
          },
        ],
      })

      return response.choices[0].message.content
    } catch (error) {
      console.error('Error calling OpenAI model:', error)
      throw error
    }
  }
}
