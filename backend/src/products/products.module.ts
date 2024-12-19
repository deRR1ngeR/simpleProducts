import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as config from '../../google.key.json';
import {
  GoogleDriveConfig,
  GoogleDriveModule,
} from 'nestjs-googledrive-upload';
import { UploadController } from 'src/upload/upload.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [
    PrismaModule,
    GoogleDriveModule.register(
      config as GoogleDriveConfig,
      '1JfpD8ODuDW_aubfrpfPlqq2z2RzFnzCU',
    ),
  ],
  controllers: [ProductController, UploadController],
  providers: [ProductService, UploadService],
})
export class ProductsModule {}
