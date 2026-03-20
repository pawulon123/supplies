import { Module } from '@nestjs/common';
import { JobsModule } from '../jobs/jobs.module';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';

@Module({
  imports: [JobsModule],
  controllers: [CronController],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}