import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConfigService {
  public readonly port = Number(process.env.PORT ?? 3210);

  public readonly logger = new Logger('AppLogger');
}
