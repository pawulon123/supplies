import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../../products/products.service';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class DailyReportService {
  private readonly logger = new Logger(DailyReportService.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly mailService: MailService,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Start generowania dziennego raportu');

    const products = await this.productsService.findAll();
    const alertEmail = process.env.MAIL_TO;

    if (!alertEmail) {
      this.logger.warn('Brak MAIL_TO w zmiennych środowiskowych');
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    if (!products.length) {
      await this.mailService.sendMail(
        alertEmail,
        `Raport dzienny produktów - ${today}`,
        'Brak produktów w bazie danych.',
      );

      this.logger.log(`Wysłano pusty raport dzienny na ${alertEmail}`);
      return;
    }

    const totalProducts = products.length;
    const totalQuantity = products.reduce(
      (sum, product) => sum + product.quantity,
      0,
    );

    const lines = products.map(
      (product) =>
        `ID: ${product.id} | ${product.name} | ilość: ${product.quantity} | waga: ${product.weight_gram} g | ważność: ${product.expiration}`,
    );

    const message = [
      `Raport dzienny produktów - ${today}`,
      '',
      `Liczba produktów: ${totalProducts}`,
      `Suma ilości: ${totalQuantity}`,
      '',
      'Lista produktów:',
      ...lines,
    ].join('\n');

    await this.mailService.sendMail(
      alertEmail,
      `Raport dzienny produktów - ${today}`,
      message,
    );

    this.logger.log(`Wysłano raport dzienny na ${alertEmail}`);
  }
}