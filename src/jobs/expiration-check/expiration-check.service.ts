import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../../products/products.service';
import { SmsService } from '../../sms/sms.service';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class ExpirationCheckService {
  private readonly logger = new Logger(ExpirationCheckService.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly smsService: SmsService,
    private readonly mailService: MailService,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Start sprawdzania dat ważności');

    const products = await this.productsService.findExpiringSoon(3);

    if (!products.length) {
      this.logger.log('Brak produktów z krótką datą ważności');
      return;
    }

    const lines = products.map(
      (product) =>
        `- ${product.name}, ilość: ${product.quantity}, ważność: ${product.expiration}`,
    );

    const smsMessage =
      `Produkty z krótką datą ważności:\n` + lines.join('\n');

    const mailSubject = 'Raport: produkty z krótką datą ważności';
    const mailMessage =
      `Wykryto produkty z krótką datą ważności:\n\n` + lines.join('\n');

    const alertPhone = process.env.ALERT_PHONE_NUMBER;
    const alertEmail = process.env.ALERT_EMAIL;

    if (alertPhone) {
      await this.smsService.sendSms(alertPhone, smsMessage);
      this.logger.log(`Wysłano SMS na ${alertPhone}`);
    }

    if (alertEmail) {
      await this.mailService.sendMail(alertEmail, mailSubject, mailMessage);
      this.logger.log(`Wysłano mail na ${alertEmail}`);
    }

    this.logger.log('Zakończono sprawdzanie dat ważności');
  }
}