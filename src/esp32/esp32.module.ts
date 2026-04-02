import { Module } from '@nestjs/common';
import { Esp32Controller } from './esp32.controller';
import { Esp32Service } from './esp32.service';

@Module({
  controllers: [Esp32Controller],
  providers: [Esp32Service],
  exports: [Esp32Service],
})
export class Esp32Module {}