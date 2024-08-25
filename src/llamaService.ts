import axios from "axios"

export class LlamaService {
  constructor(
    private readonly endpoint: string,
    private readonly headers = { "Content-Type": "application/json" }
  ) {}

  async getAnswerFromText(systemPrompt: string, text: string) {
    try {
      console.log("\x1b[33m Making request to model: \x1b[0m")

      const { data } = await axios.post(
        this.endpoint,
        {
          prompt: `${systemPrompt} ${text}`, // Input question
          max_tokens: 100,
          temperature: 0.3,
          top_k: 50,
          no_stop_token: true,
          output: { return_full_text: true },
        },
        { headers: this.headers }
      )

      return data.choices[0].text
    } catch (error) {
      console.error("Error calling model:", error)
      throw error
    }
  }
}
