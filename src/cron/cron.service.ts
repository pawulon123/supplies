import { Injectable, Logger } from '@nestjs/common';
import { ExpirationCheckService } from '../jobs/expiration-check/expiration-check.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly expirationCheckService: ExpirationCheckService,
  ) {}

  async runExpirationCheck(): Promise<{ message: string }> {
    this.logger.log('Uruchamiam sprawdzanie dat ważności');

    await this.expirationCheckService.run();

    this.logger.log('Zakończono sprawdzanie dat ważności');

    return {
      message: 'Sprawdzanie dat ważności zostało wykonane',
    };
  }
}