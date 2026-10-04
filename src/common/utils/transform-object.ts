import { CreateEsp32EventDto } from "src/esp32/dto/create-esp32-event.dto/create-esp32-event.dto";

export function esp32DtoToObject(dto: CreateEsp32EventDto) {
  return {
    deviceId: dto.deviceId,
    type: dto.type,
    battery: dto.battery,
    ...(dto.payload ?? {}),
    firmwareVersion: dto.firmwareVersion,
  };
}