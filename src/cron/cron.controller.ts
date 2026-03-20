import { Controller, Post } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post('check-expiration')
  async checkExpiration() {
    return this.cronService.runExpirationCheck();
  }

  @Post('daily-report')
  async dailyReport() {
    return this.cronService.runDailyReport();
  }
}