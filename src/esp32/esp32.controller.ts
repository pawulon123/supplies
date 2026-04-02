import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Esp32Service } from './esp32.service';
import { CreateEsp32EventDto } from './dto/create-esp32-event.dto/create-esp32-event.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Controller('esp32')
export class Esp32Controller {
  constructor(private readonly esp32Service: Esp32Service) {}

  @Get('health')
  health() {
    return this.esp32Service.health();
  }

  @UseGuards(ApiKeyGuard)
  @Post('events')
  receiveEvent(@Body() dto: CreateEsp32EventDto) {
    return this.esp32Service.handleEvent(dto);
  }
}