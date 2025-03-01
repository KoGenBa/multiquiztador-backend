import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { config } from './db.config';

const logger = new Logger('DataSource');

export const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then((r) => {
    logger.log(`Connected to Data Source ${r.driver.database}!`);
  })
  .catch((err) => {
    throw err;
  });
