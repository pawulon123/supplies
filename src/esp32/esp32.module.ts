import { Module } from '@nestjs/common';
import { Esp32Controller } from './esp32.controller';
import { Esp32Service } from './esp32.service';
import { SmsModule } from 'src/sms/sms.module';
import { TelegramModule } from 'src/telegram/telegram.module'

@Module({
  controllers: [Esp32Controller],
  providers: [Esp32Service],
  exports: [Esp32Service],
    imports: [SmsModule, TelegramModule],
})
export class Esp32Module {}