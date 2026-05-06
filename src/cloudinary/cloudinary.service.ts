import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    // Configuramos cloudinary una sola vez al levantar el servicio
    cloudinary.config({
      cloud_name: config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: config.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: config.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  }

  /**
   * Sube un Buffer a Cloudinary usando upload_stream.
   * No escribe archivos al disco — el buffer va directo a la nube.
   */
  uploadBuffer(buffer: Buffer, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error, result) => {
          if (error) {
            return reject(
              new BadRequestException(`Cloudinary error: ${error.message}`),
            );
          }
          resolve(result.secure_url); // URL HTTPS pública
        },
      );
      Readable.from(buffer).pipe(uploadStream);
    });
  }
}
