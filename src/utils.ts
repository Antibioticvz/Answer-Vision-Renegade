import fs from 'fs'
import Tesseract from 'tesseract.js'

export const extractTextFromImage = async (
  imagePath: string,
  language: string
): Promise<string> => {
  const imageData = await fs.promises.readFile(imagePath)
  const recognitionResult = await Tesseract.recognize(imageData, language, {
    logger: () => {},
    errorHandler: error => {
      throw new Error(error)
    },
  })

  return recognitionResult.data.text
}
