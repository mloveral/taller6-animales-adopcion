import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateAdoptionRequestDto {
  @ApiProperty({ example: '3fa8...', description: 'UUID del usuario' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: '3fa8...', description: 'UUID del animal' })
  @IsUUID()
  animalId: string;

  @ApiPropertyOptional({
    example: 'Tengo patio grande y experiencia con perros',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
