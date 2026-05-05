import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdoptionRequestDto } from './create-adoption-request.dto';
import { IsIn } from 'class-validator';

export class UpdateAdoptionRequestDto {

  @ApiProperty({
    example: 'aprobada',
    enum: ['aprobada', 'rechazada'],
    description: 'Nuevo estado de la solicitud',
  })
  @IsIn(['aprobada', 'rechazada'])
  status: string;
}