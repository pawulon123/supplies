import { Injectable, Logger } from '@nestjs/common';
import { CreateEsp32EventDto } from './dto/create-esp32-event.dto/create-esp32-event.dto';


@Injectable()
export class Esp32Service {
  private readonly logger = new Logger(Esp32Service.name);

  async handleEvent(dto: CreateEsp32EventDto) {
    this.logger.log(`ESP32 event from ${dto.deviceId}: ${dto.type}`);

    // Tu możesz:
    // - zapisać do bazy
    // - odpalić SMS/email
    // - wrzucić job do crona/queue
    // - zaktualizować status urządzenia

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