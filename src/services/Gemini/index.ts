import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { randomBytes } from 'crypto';

type IPromptType = {
  mimetype: string;
  fileUri: string;
}

export default class GeminiService {
  private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

  private static fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY || '')

  private static model = this.genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });

  static async uploadImage(file: string) {
    try {
      const uploadResponse = await this.fileManager.uploadFile(file, {
        mimeType: "image/png",
        displayName: `${randomBytes(10).toString('hex')}.png`,
      });

      return {
        fileUri: uploadResponse.file.uri,
        mimetype: uploadResponse.file.mimeType
      };
    }

    catch (error) {
      console.log('error', error)
    }
    
  }

  static async generateDataFromImage(prompt: IPromptType) {
    if (!prompt) return;

    let response;

    try {
      response = await this.model.generateContent([{
        fileData: {
          mimeType: prompt.mimetype,
          fileUri: prompt.fileUri
        }
      },
      { text: "Please send the exact value and month of measurement of this document following example: value: xxx.xx, period: mm/yyyy. If you see no data, you can put like this for each case: value: not available, period: not available."},
    ]);
    }
    catch (error) {
      console.log(error);
      throw new Error('Error generating data from image');
    }

    if (!response) throw new Error('Error generating data from image');

    return response;
  }

}