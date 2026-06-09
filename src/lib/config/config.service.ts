import { Injectable, Logger } from '@nestjs/common';
import { env } from 'process';

@Injectable()
export class ConfigService {
  public getEnvVar(key: string, defaultValue?: string): string | undefined {
    return env[key] ?? defaultValue;
  }

  public readonly nodeEnv = this.getEnvVar('NODE_ENV', 'development');

  public readonly port = Number(this.getEnvVar('PORT', '3210'));

  public readonly logger = new Logger('AppLogger');
}
