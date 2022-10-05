import { DataSource } from "typeorm";

// Using environment variables
import dotenv from "dotenv";
dotenv.config();

const connectDB = new DataSource({
  type: "mongodb",
  url: process.env.DATABASE_URI,
  host: process.env.HOST,
  port: 333,
  username: "",
  password: "",
  database: "",
  entities: ["./src/Entities/**/*.ts"],
});


// intializing datasource
connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default connectDB;
