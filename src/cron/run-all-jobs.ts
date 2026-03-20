import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ExpirationCheckService } from '../jobs/expiration-check/expiration-check.service';
import { DailyReportService } from '../jobs/daily-report/daily-report.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const expirationJob = app.get(ExpirationCheckService);
    const dailyReportJob = app.get(DailyReportService);

    try {
      await expirationJob.run();
    } catch (err) {
      console.error('Expiration job failed:', err);
    }

    try {
      await dailyReportJob.run();
    } catch (err) {
      console.error('Daily report job failed:', err);
    }
  } finally {
    await app.close();
  }
}

bootstrap()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });