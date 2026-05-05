import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Location } from '../locations/entities/location.entity';
import { User } from '../users/entities/user.entity';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    // Registra Animal + las entities de las FKs
    TypeOrmModule.forFeature([Animal, Location, User]),
    MulterModule.register({ storage: memoryStorage() }),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
