import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendMail(to: string, subject: string, text: string) {
    const apiKey = process.env.BREVO_API_KEY;
    const from = process.env.MAIL_FROM;

    if (!apiKey) {
      throw new Error('Brak BREVO_API_KEY w .env');
    }

    if (!from) {
      throw new Error('Brak MAIL_FROM w .env');
    }

    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: {
            email: from,
          },
          to: [
            {
              email: to,
            },
          ],
          subject,
          textContent: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Błąd wysyłki maila: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
    }
  }
}