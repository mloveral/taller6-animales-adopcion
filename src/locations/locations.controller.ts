import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ubicación' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ status: 201, description: 'Ubicación creada exitosamente' })
  create(@Body() dto: CreateLocationDto) { return this.locationsService.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ubicaciones' })
  @ApiResponse({ status: 200, description: 'Lista de ubicaciones obtenida' })
  findAll() { return this.locationsService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ubicación por ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID de la ubicación' })
  @ApiResponse({ status: 200, description: 'Ubicación encontrada' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.locationsService.findOne(id); }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una ubicación' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID de la ubicación' })
  @ApiBody({ type: UpdateLocationDto })
  @ApiResponse({ status: 200, description: 'Ubicación actualizada exitosamente' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLocationDto) { return this.locationsService.update(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ubicación' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID de la ubicación' })
  @ApiResponse({ status: 200, description: 'Ubicación eliminada exitosamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.locationsService.remove(id); }
}
