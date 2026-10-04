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
    // this.logger.log(`ESP32 event from ${dto.deviceId}: ${dto.type}`);
    const espObj = esp32DtoToObject(dto)
    
    const smsMessage = 'Restart'
    const alertPhone = process.env.ALERT_PHONE_NUMBER;
if(espObj.event)
    this.logger.log(espObj.event, alertPhone);
  
  
  if (alertPhone) {
  this.logger.log('tel',alertPhone);
  
}
    if(espObj.event && alertPhone){
      this.logger.log('after',espObj.event, espObj);
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