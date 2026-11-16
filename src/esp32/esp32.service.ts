
import { Injectable, Logger } from '@nestjs/common';
import { CreateEsp32EventDto } from './dto/create-esp32-event.dto/create-esp32-event.dto';
import { esp32DtoToObject } from 'src/common/utils/transform-object';
import { SmsService } from 'src/sms/sms.service';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class Esp32Service {
  private readonly logger = new Logger(Esp32Service.name);

  constructor(
    private readonly telegramService: TelegramService,
    private readonly smsService: SmsService,
  ) {}

  async handleEvent(dto: CreateEsp32EventDto) {
    const data = esp32DtoToObject(dto);

    this.logger.log(
      `ESP32 RX: ${dto.deviceId}, type: ${dto.type}`,
    );

    // Telegram - alarm
    if (dto.type === 'alarm') {
      await this.sendTelegramAlert(data);
    }

    // SMS - zdarzenie z ESP32
    if (data.event?.trim()) {
      await this.sendSmsAlert(data);
    }

    return {
      ok: true,
      receivedAt: new Date().toISOString(),
      deviceId: dto.deviceId,
      type: dto.type,
    };
  }

  private async sendTelegramAlert(
    data: ReturnType<typeof esp32DtoToObject>,
  ): Promise<void> {
    const message = this.buildMessage(data);

    try {
      const sent = await this.telegramService.sendMessage(message);

      if (sent) {
        this.logger.log('Telegram wyslany');
      } else {
        this.logger.warn('Telegram nie zostal wyslany');
      }
    } catch (error) {
      this.logger.error(
        'Blad wysylania Telegram',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  private async sendSmsAlert(
  data: ReturnType<typeof esp32DtoToObject>,
): Promise<void> {
  const phone = process.env.ALERT_PHONE_NUMBER;

  if (!phone) {
    this.logger.warn('Brak ALERT_PHONE_NUMBER');
    return;
  }

  const message = this.buildMessage(data);

  try {
    const result = await this.smsService.sendSms(phone, message);

    this.logger.log(
      `SMS przyjety przez operatora: ${result.sid}, status: ${result.status}`,
    );
  } catch (error) {
    this.logger.error(
      'Blad wysylania SMS',
      error instanceof Error ? error.stack : String(error),
    );
  }
}
  private buildMessage(
    data: ReturnType<typeof esp32DtoToObject>,
  ): string {
    const event = data.event?.trim() || data.type.toUpperCase();
    const name = data.nameSensor || data.deviceId;

    return [
      `${event} - ${name}`,
      `Temperatura: ${data.temperature ?? 'brak'} C`,
      `Cisnienie: ${data.pressure ?? 'brak'} hPa`,
      `Wilgotnosc: ${data.humidity ?? 'brak'} %`,
    ].join('\n');
  }

  health() {
    return {
      ok: true,
      service: 'esp32-endpoint',
      time: new Date().toISOString(),
    };
  }
}
