import express from "express";
import banksRouter from "./routes/banksRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Comentario para iniciar o uso do Git

// inicia arquivo de variaveis de ambiente usando dotenv
dotenv.config();
// busca as variaveis de ambiente
const { USER_DB, USER_PWD, PORT } = process.env;

(async () => {
  try {
    console.log("Conectando ao MongoDB... ");
    await mongoose.connect(
      `mongodb+srv://${USER_DB}:${USER_PWD}@cluster0.cxqt7.mongodb.net/igti_modulo_4?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("Conectado com sucesso ao MongoDB");
  } catch (error) {
    console.log(`Variáveis USER_DB:${USER_DB} - USER_PWD: ${USER_PWD} - PORT: ${PORT}`);
    console.log("Erro ao conectar no MongoDB. " + error);
  }
})();

const app = express();

app.use(express.json());
app.use(banksRouter);

app.listen(PORT, () => {
  console.log(`API Bank Started at port ${PORT}...`);
});
