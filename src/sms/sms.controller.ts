import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async send(@Body() body: { to: string; message: string }) {
    return this.smsService.sendSms(body.to, body.message);
  }
}