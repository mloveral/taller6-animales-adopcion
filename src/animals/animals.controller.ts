import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { QueryAnimalsDto } from './dto/query-animals.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo animal' })
  @ApiBody({ type: CreateAnimalDto })
  @ApiResponse({ status: 201, description: 'Animal creado exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos (validación del DTO)',
  })
  create(@Body() dto: CreateAnimalDto) {
    return this.animalsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar animales con paginación y filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada: { data, total, page, limit }',
  })
  findAll(@Query() query: QueryAnimalsDto) {
    return this.animalsService.findAll(query);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un animal por UUID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID del animal' })
  @ApiResponse({ status: 200, description: 'Animal encontrado' })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de un animal' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'ID del animal',
  })
  @ApiResponse({ status: 200, description: 'Animal actualizado' })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  @ApiBody({ type: UpdateAnimalDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAnimalDto) {
    return this.animalsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un animal' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Animal eliminado' })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalsService.remove(id);
  }

  @Post(':id/imagen')
  @ApiOperation({ summary: 'Subir o reemplazar la foto del animal' })
  @ApiParam({ name: 'id', type: String, description: 'UUID del animal' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['imagen'],
      properties: {
        imagen: {
          type: 'string',
          format: 'binary',
          description: 'Imagen del animal (JPEG, PNG o WebP · máx 2 MB)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Animal con campo imagen actualizado',
  })
  @ApiResponse({
    status: 400,
    description: 'Archivo inválido (tipo o tamaño incorrecto)',
  })
  @ApiResponse({ status: 404, description: 'Animal no encontrado' })
  @UseInterceptors(FileInterceptor('imagen'))
  uploadImagen(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), // 2 MB
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.animalsService.uploadImagen(id, file);
  }
}
