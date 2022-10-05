import express, { Request, Response } from "express";
require("dotenv").config();
const port = process.env.PORT || 5000;


// initializing express
const app = express();
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(` Server is running at https://localhost:${port}`);
});
