import { extractTextFromImage } from "./utils"

const handleNewFile = async (
  imagePath: string,
  service: { getAnswerFromText: (text: string) => Promise<string> },
  tesseractLang: string
) => {
  const extractedText = await extractTextFromImage(imagePath, tesseractLang)
  console.log("\x1b[35mExtracted text: \x1b[0m")
  console.log(extractedText)

  try {
    const answer = await service.getAnswerFromText(extractedText)
    console.log(`\x1b[32m ${answer} \x1b[0m`)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n")
  } catch (error) {
    console.error("Error getting answer:", error)
  }
}

export { handleNewFile }
