import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('seed')
  @ApiOperation({ summary: 'Poblar la base de datos con datos de prueba' })
  @ApiResponse({ status: 201, description: 'Base de datos poblada exitosamente' })
  @ApiResponse({ status: 400, description: 'Los datos ya existen en la base de datos' })
  async seed() {
    return this.seederService.seed();
  }
}
