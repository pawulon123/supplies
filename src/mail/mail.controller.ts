import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async send(
    @Body() body: { to?: string; subject: string; message: string },
  ) {
    const to = body.to || process.env.MAIL_TO;

    if (!to) {
      throw new Error('Brak adresu odbiorcy');
    }

    return this.mailService.sendMail(to, body.subject, body.message);
  }
}