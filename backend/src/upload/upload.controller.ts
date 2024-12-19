import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  public async uploadUserAvatar(
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    return await this.uploadService.uploadImage(file);
  }
}
