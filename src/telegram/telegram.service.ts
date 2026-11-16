
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  async sendMessage(message: string): Promise<boolean> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      this.logger.error('Telegram configuration missing');
      return false;
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
          signal: AbortSignal.timeout(10000),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        this.logger.error(`Telegram HTTP ${response.status}`);
        return false;
      }

      this.logger.log('Telegram message sent');
      return true;
    } catch (error) {
      this.logger.error('Telegram request failed', error);
      return false;
    }
  }
}
