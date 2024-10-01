import path from "path";
import fs from "fs";
import { randomBytes } from "crypto";

export default class TempFileService {
  tempDir = '/usr/src/app/uploads'

  async WriteFile(image: string): Promise<any> {
    try {  
      const imageBuffer =  Buffer.from(image, 'base64');
      
      const imageName = `${randomBytes(10).toString('hex')}.png`;
      
      const filePath = path.join(this.tempDir, imageName);

      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir, { recursive: true });
      }

      await fs.promises.writeFile(filePath, imageBuffer).then(() => console.log('Image saved to file'))

      return filePath
    }
    catch (error) {
      console.log('error: ', error)
      return error;
    }
  }

  async DeleteFile(filePath: string): Promise<any> {
    try {
      await fs.promises.unlink(filePath).then(() => console.log('File deleted'))

      return filePath
    }
    catch (error) {
      console.log('error: ', error)
      return error;
    }
  }

}