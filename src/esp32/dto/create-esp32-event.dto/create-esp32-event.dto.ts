import { IsIn, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEsp32EventDto {
  @IsString()
  @MaxLength(64)
  deviceId: string;

  @IsString()
  @IsIn(['boot', 'heartbeat', 'sensor', 'alarm', 'status'])
  type: string;

  @IsOptional()
  @IsNumber()
  battery?: number;

  @IsOptional()
  @IsObject()
  payload?: Esp32Payload;;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  firmwareVersion?: string;
}

export interface Esp32Payload {
  event?: string;
  temperature?: number;
  pressure?: number;
  humidity?: number;
  usageMinutes?: number;
}
