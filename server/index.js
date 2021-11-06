import mongoose from 'mongoose';

import config from '../config';
import app from './main';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.info(`Server started on port ${config.port}`);
});
