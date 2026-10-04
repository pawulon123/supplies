import { Injectable, Logger } from '@nestjs/common';
import { CreateEsp32EventDto } from './dto/create-esp32-event.dto/create-esp32-event.dto';
import { esp32DtoToObject } from 'src/common/utils/transform-object';
import { SmsService } from 'src/sms/sms.service';


@Injectable()
export class Esp32Service {
  private readonly logger = new Logger(Esp32Service.name);
 constructor(

    private readonly smsService: SmsService,
    
  ) {}
  async handleEvent(dto: CreateEsp32EventDto) {
    const espObj = esp32DtoToObject(dto)
    
    const smsMessage = `RESTART
    Temp: ${espObj.temperature},
    Ciśnienie: ${espObj.pressure},
    Wilgotność ${espObj.humidity}
    `
    const alertPhone = process.env.ALERT_PHONE_NUMBER;

    if(espObj.event && alertPhone){
      await this.smsService.sendSms(alertPhone, smsMessage);
      this.logger.log(`Wysłano SMS na ${alertPhone}`);
    }
    

    return {
      ok: true,
      receivedAt: new Date().toISOString(),
      deviceId: dto.deviceId,
      type: dto.type,
    };
  }

  async health() {
    return {
      ok: true,
      service: 'esp32-endpoint',
      time: new Date().toISOString(),
    };
  }
}