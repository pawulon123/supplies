import { Injectable, Logger } from '@nestjs/common';
import { ExpirationCheckService } from '../jobs/expiration-check/expiration-check.service';
import { DailyReportService } from '../jobs/daily-report/daily-report.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly expirationCheckService: ExpirationCheckService,
    private readonly dailyReportService: DailyReportService,
  ) {}

  async runExpirationCheck(): Promise<{ message: string }> {
    this.logger.log('Uruchamiam sprawdzanie dat ważności');

    await this.expirationCheckService.run();

    this.logger.log('Zakończono sprawdzanie dat ważności');

    return {
      message: 'Sprawdzanie dat ważności zostało wykonane',
    };
  }

  async runDailyReport(): Promise<{ message: string }> {
    this.logger.log('Uruchamiam raport dzienny');

    await this.dailyReportService.run();

    this.logger.log('Zakończono raport dzienny');

    return {
      message: 'Raport dzienny został wysłany',
    };
  }
}