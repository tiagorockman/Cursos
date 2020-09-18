import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";
import {gradeRouter } from './routes/gradeRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
   // console.log(db.url)
    await mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Erro ao conectar no banco " + error);
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://grades-app-igtidesaf4.herokuapp.com',
  })
);

const PORT = process.env.PORT || 8081;
app.use(gradeRouter);
app.listen(PORT, () => {});

console.log("Em execução PORT: " + PORT);