import { DataSource } from "typeorm";
import {MONGO_URL} from "../src/tools/config";
// Using environment variables
import dotenv from "dotenv";
dotenv.config();

const myDataSource = new DataSource({
  type: "mongodb",
  url: MONGO_URL,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  useUnifiedTopology: true,
  entities: [`${__dirname}/entities/**/*.ts`,`${__dirname}/entities/**/*.js`],
});


const db = () => {
  myDataSource
    .initialize()
    .then(() => {
      console.log(`Connected to database ${MONGO_URL}`);
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
}

export {myDataSource}
export default db;
