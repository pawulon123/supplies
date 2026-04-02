import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { SmsModule } from './sms/sms.module';
import { MailModule } from './mail/mail.module';
import { JobsModule } from './jobs/jobs.module';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';
import { Esp32Module } from './esp32/esp32.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    SmsModule,
    MailModule,
    JobsModule,
    CronModule,
    Esp32Module,
  ],
  providers: [CronService],
})
export class AppModule {}