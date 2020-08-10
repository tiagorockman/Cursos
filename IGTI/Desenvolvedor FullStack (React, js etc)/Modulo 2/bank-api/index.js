import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";
import winston from "winston"
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js";


const { readFile, writeFile } = fs;
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({level, message, label, timestamp})=>{
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports:[
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: "my-bank-api.log"})
  ],
  format: combine(
    label({ label: "my-bank-api"}),
    timestamp(),
    myFormat
  )
});

const app = express();
app.use(express.json());

// utilizando swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// envia rota para o arquivo account.js
app.use("/account", accountsRouter);

app.listen(3000, async ()=>{
  try {
    await readFile("accounts.json");
    logger.info("API Started!");
  }catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    writeFile("accounts.json", JSON.stringify(initialJson)).then(() => {
      logger.info("API Started and File Created!");
    }).catch(err =>{
      logger.error(err);
    });
  }
});

