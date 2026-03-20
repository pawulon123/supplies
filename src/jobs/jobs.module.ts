import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { SmsModule } from '../sms/sms.module';
import { MailModule } from '../mail/mail.module';
import { ExpirationCheckService } from './expiration-check/expiration-check.service';
import { DailyReportService } from './daily-report/daily-report.service';

@Module({
  imports: [ProductsModule, SmsModule, MailModule],
  providers: [ExpirationCheckService, DailyReportService],
  exports: [ExpirationCheckService, DailyReportService],  
})
export class JobsModule {}