import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @ApiResponse({ status: 409, description: 'Email ya registrado' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @ApiResponse({ status: 409, description: 'Email ya registrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del usuario' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/favorites/:animalId')
  @ApiOperation({ summary: 'Agregar animal a favoritos' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del usuario' })
  @ApiParam({ name: 'animalId', type: 'string', format: 'uuid', description: 'ID del animal' })
  @ApiResponse({ status: 200, description: 'Animal agregado a favoritos' })
  addFavorite(
    @Param('id',       ParseUUIDPipe) userId:   string,
    @Param('animalId', ParseUUIDPipe) animalId: string,
  ) {
    return this.usersService.addFavorite(userId, animalId);
  }

  @Get(':id/favorites')
  @ApiOperation({ summary: 'Obtener animales favoritos del usuario' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de favoritos obtenida' })
  getFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getFavorites(id);
  }

  @Delete(':id/favorites/:animalId')
  @ApiOperation({ summary: 'Eliminar animal de favoritos' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'ID del usuario' })
  @ApiParam({ name: 'animalId', type: 'string', format: 'uuid', description: 'ID del animal' })
  @ApiResponse({ status: 200, description: 'Animal eliminado de favoritos' })
  removeFavorite(
    @Param('id',       ParseUUIDPipe) userId:   string,
    @Param('animalId', ParseUUIDPipe) animalId: string,
  ) {
    return this.usersService.removeFavorite(userId, animalId);
  }
}