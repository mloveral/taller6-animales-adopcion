import {
  IsEmail, IsIn, IsInt,
  IsOptional, IsString,
  IsUUID, Min, MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnimalDto {
  @IsString()
  @ApiProperty({ example: 'Luna', description: 'Nombre del animal' })
  nombre: string;

  @IsString()
  @ApiProperty({ example: 'perro', description: 'Especie del animal' })
  especie: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ example: 18, description: 'Edad del animal en meses' })
  edad: number;

  @IsString()
  @MinLength(10)
  @ApiProperty({
    example: 'Labrador dorada, cariñosa y muy activa',
    description: 'Descripción del animal',
  })
  descripcion: string;

  @IsOptional()
  @IsIn(['disponible', 'adoptado'])
  @ApiPropertyOptional({
    example: 'disponible',
    description: 'Estado del animal',
  })
  estado?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'URL de la imagen del animal',
  })
  imagen?: string;

  @IsEmail()
  @ApiProperty({
    example: 'patitas@demo.com',
    description: 'Email de contacto',
  })
  contacto: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la ubicación',
  })
  locationId?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del usuario que registra',
  })
  registeredById?: string;
}