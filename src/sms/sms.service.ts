import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Twilio from 'twilio';

@Injectable()
export class SmsService {
  private client: Twilio.Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) { 
      throw new Error('Brak konfiguracji Twilio w zmiennych środowiskowych');
    }

    this.client = Twilio(accountSid, authToken);
  }

  async sendSms(to: string, body: string) {
    try {
      const from = process.env.TWILIO_PHONE_NUMBER;

      if (!from) {
        throw new Error('Brak TWILIO_PHONE_NUMBER');
      }

      const message = await this.client.messages.create({
        to,
        from,
        body,
      });

      return {
        sid: message.sid,
        status: message.status,
        to: message.to,
        from: message.from,
        body: message.body,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Błąd wysyłki SMS: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
    }
  }
}