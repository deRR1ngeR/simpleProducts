import { Injectable } from '@nestjs/common';
import { GoogleDriveService } from 'nestjs-googledrive-upload';

@Injectable()
export class UploadService {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  public async uploadImage(file: Express.Multer.File[]): Promise<string[]> {
    try {
      const linkListPromise = file.map(async (file) => {
        const link = await this.googleDriveService.uploadImage(file);
        return link;
      });

      const linkList = await Promise.all(linkListPromise);

      return linkList;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getImage(fileId: string): Promise<string> {
    try {
      const link = await this.googleDriveService.getImage(fileId);
      // do something with the link, e.g., return it to the user
      return link;
    } catch (e) {
      throw new Error(e);
    }
  }
}
