import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AdoptionRequestsService }  from './adoption-requests.service';
import { CreateAdoptionRequestDto } from './dto/create-adoption-request.dto';
import { UpdateAdoptionRequestDto } from './dto/update-adoption-request.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('adoption-requests')
@Controller('adoption-requests')
export class AdoptionRequestsController {
  constructor(
    private readonly adoptionRequestsService: AdoptionRequestsService,
  ) {}

  @ApiOperation({ summary: 'Crear solicitud de adopción' })
  @ApiResponse({ status: 201, description: 'Solicitud creada' })
  @ApiResponse({
    status: 409,
    description: 'Solicitud duplicada o animal ya adoptado',
  })
  @Post()
  create(@Body() dto: CreateAdoptionRequestDto) {
    return this.adoptionRequestsService.create(dto);
  }

  @Get()
  findAll() {
    return this.adoptionRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptionRequestsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Aprobar o rechazar una solicitud' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Estado actualizado' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAdoptionRequestDto,
  ) {
    return this.adoptionRequestsService.updateStatus(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptionRequestsService.remove(id);
  }
}