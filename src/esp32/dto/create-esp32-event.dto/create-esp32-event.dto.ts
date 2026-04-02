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
  payload?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  firmwareVersion?: string;
}
