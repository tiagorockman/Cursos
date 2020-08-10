import express from "express";
import { readFile } from "fs";
import gradeRoute from "./rotas/rotas.js";

const app = express();
app.use(express.json());

app.use("/grade", gradeRoute);

app.listen(3000, async ()=>{
  try{
  //  await readFile("grades.json");
    console.log("API Started");
  }catch(err){
    console.log("Erro: " + err);
  }
});
