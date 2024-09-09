import fs from 'fs'
import Tesseract, { createWorker } from 'tesseract.js'

export const extractTextFromImage = async (
  imagePath: string,
  language: string
): Promise<string> => {
  const imageData = await fs.promises.readFile(imagePath)
  const recognitionResult = await Tesseract.recognize(imageData, language, {})

  return recognitionResult.data.text
}

export const extractTextFromImageWorker = async (
  imagePath: string,
  language: string
): Promise<string> => {
  const worker = await createWorker(language)

  // await worker.setParameters({
  // tessedit_pageseg_mode: PSM.AUTO_ONLY,
  // output_format: 'hocr',
  // tessjs_create_hocr: '1',
  // })
  const imageData = await fs.promises.readFile(imagePath)
  const {
    data: { text },
  } = await worker.recognize(
    imagePath,
    {},
    {
      blocks: true,
      layoutBlocks: true,
      hocr: false,
      tsv: false,
      // box: false,
      unlv: false,
      osd: false,
      pdf: false,
      imageColor: false,
      imageGrey: false,
      imageBinary: false,
      debug: false,
    }
  )

  await worker.terminate()
  // console.log('>>>>>> ', layoutBlocks)
  return text
  // return text
}
