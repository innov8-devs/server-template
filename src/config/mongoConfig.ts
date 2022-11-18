import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
const { MONGO_URL } = process.env;
const options = {
  keepAlive: true,
  serverSelectionTimeoutMS: 30000, // Defaults to 30000 (30 seconds)
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class db {
  public connect() {
    const log = console;
    mongoose
      .connect(MONGO_URL as string, options)
      .then(async () => {
        log.info(`Successfully connected to `, MONGO_URL);
      })
      .catch((err: MongoError) => {
        log.error(`There was a db connection error`, err);
        process.exit(0);
      });
    mongoose.connection.once('disconnected', () => {
      log.error(`Successfully disconnected from ${MONGO_URL}`);
    });
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        log.error('dBase connection closed due to app termination');
        process.exit(0);
      });
    });
  }
}

export default db;
