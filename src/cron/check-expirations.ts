import 'reflect-metadata';
import { DataSource, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Product } from '../products/product.entity';
import Twilio from 'twilio';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Product],
  synchronize: false,
});

async function main() {
  await dataSource.initialize();

  const repo = dataSource.getRepository(Product);

  const today = new Date();
  const in3Days = new Date();
  in3Days.setDate(today.getDate() + 3);

  const products = await repo.find({
    where: {
      expiration: LessThanOrEqual(in3Days.toISOString().slice(0, 10)) as any,
    },
    order: {
      expiration: 'ASC',
    },
  });

//   if (products.length === 0) {
//     console.log('Brak produktów do powiadomienia');
//     await dataSource.destroy();
//     process.exit(0);
//   }

  const client = Twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!,
  );

//   const lines = products.map(
//     (p) => `${p.name} | ilość: ${p.quantity} | ważność: ${p.expiration}`,
//   );

//   const message = `Produkty z krótką datą:\n${lines.join('\n')}`;
  const message = `Produkty z krótką datą:\nfffffffffff}`;

  await client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER!,
    to: process.env.ALERT_PHONE_NUMBER!,
    body: message,
  });

  console.log(`Wysłano SMS dla ${products.length} produktów`);

  await dataSource.destroy();
  process.exit(0);
}

main().catch(async (err) => {
  console.error(err);
  try {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  } catch {}
  process.exit(1);
});