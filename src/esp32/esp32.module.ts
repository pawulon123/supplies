import { Module } from '@nestjs/common';
import { Esp32Controller } from './esp32.controller';
import { Esp32Service } from './esp32.service';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  controllers: [Esp32Controller],
  providers: [Esp32Service],
  exports: [Esp32Service],
    imports: [SmsModule],
})
export class Esp32Module {}