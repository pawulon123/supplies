import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKey = request.header('x-api-key');
    const expectedApiKey = process.env.ESP32_API_KEY;

    if (!expectedApiKey) {
      throw new ForbiddenException('ESP32_API_KEY is not configured');
    }

    if (apiKey !== expectedApiKey) {
      throw new ForbiddenException('Invalid API key');
    }

    return true;
  }
}