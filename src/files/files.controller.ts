import {
  Controller,
  Post,
  UseInterceptors,
  MaxFileSizeValidator,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Departments')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.fileService.upload(file.originalname, file.buffer);
  }
}
