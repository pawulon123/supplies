import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ExpirationCheckService } from '../jobs/expiration-check/expiration-check.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const job = app.get(ExpirationCheckService);
    await job.run();
  } finally {
    await app.close();
  }
}

bootstrap()
  .then(() => process.exit(0))
  .catch(async (err) => {
    console.error(err);
    process.exit(1);
  });