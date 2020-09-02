import express from 'express';
import mongoose from 'mongoose';
import {studentRouter} from './routes/studentRouter.js';


//Conectando ao MongoDB pelo Mongoose
(async () => {
  try{
    await mongoose.connect("mongodb+srv://admin:root@cluster0.cxqt7.mongodb.net/newDB?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado");
  }catch(error){
    console.log(`Erro: ${error}`);
  }
})();


const app = express();

app.use(express.json());
app.use(studentRouter);

app.listen(3000, () => console.log('Api iniciada'));