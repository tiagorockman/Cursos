import express from "express";
import { promises as fs } from "fs";
import { parse } from "path";
import { isMainThread } from "worker_threads";

global.filename = "grades.json"

const router = express.Router();

router.get("/somaAluno", async (req, res)=>{
  try{
    const data =  JSON.parse(await fs.readFile(global.filename));
    data.grades = data.grades.filter(d => d.student.toLowerCase() == req.body.student.toLowerCase() 
      && d.subject.toLowerCase() == req.body.subject.toLowerCase());
  // data.grades = data.grades.filter(d => d.subject == req.body.subject);   

    const notas = data.grades.reduce((acumulate, next)  => {
     return acumulate + next.value;
    },0);

    if(notas == null || notas == 0)
      res.send(`${req.body.student} na matéria ${req.body.subject} não foi encontrado notas.`)

    res.send(`${req.body.student} teve nota total de ${notas} na matéria ${req.body.subject}`);

  }catch(err){
    res.send("Erro: " + err);
  }
});

router.get("/mediaNota", async (req, res)=>{
  try{
    const data =  JSON.parse(await fs.readFile(global.filename));
    data.grades = data.grades.filter(d => d.subject.toLowerCase() == req.body.subject.toLowerCase() 
      && d.type.toLowerCase() == req.body.type.toLowerCase());

    const qtdNotas = data.grades.length;
    const notas = data.grades.reduce((acumulate, next)  => {
     return acumulate + next.value;
    },0);
    
    if(typeof(qtdNotas) === 'undefined')
      res.send("O Filtro não retornou registro");

    if(notas == null || notas == 0)
      res.send(`Para a matéria ${req.body.subject} do tipo ${req.body.type} não foi encontrado notas.`)
    
    const media = notas / qtdNotas;
    res.send(` A matéria ${req.body.subject} teve média de ${media} para o tipo ${req.body.type}`);

  }catch(err){
    res.send("Erro: " + err);
  }
});

router.patch("/updateNotaById/:id/:value", async (req, res)=>{
if(req.params.id == null || req.params.value == null ) 
    throw new Error("Parametro inválido");

  const data =  JSON.parse(await fs.readFile(global.filename));
  const index = data.grades.findIndex(grade => grade.id == req.params.id);

  data.grades[index].value = parseInt(req.params.value);

  await fs.writeFile(global.filename, JSON.stringify(data, null, 2));
  res.send("Registro Atualizado");
});

router.get("/melhoresGrades", async (req, res)=>{
  try{
    const data =  JSON.parse(await fs.readFile(global.filename));
    data.grades = data.grades.filter(d => d.subject.toLowerCase() == req.body.subject.toLowerCase() 
      && d.type.toLowerCase() == req.body.type.toLowerCase());
    
    if(data.grades.length < 1)
      res.send("O Filtro não retornou registro");

    data.grades.sort((prev, next)=> {
      return next.value - prev.value;
    });

    res.send(JSON.stringify(data.grades.slice(0, 3)));

   //  const valor = ;
    res.send(` A matéria ${req.body.subject} teve média de ${media} para o tipo ${req.body.type}`);

  }catch(err){
    res.send("Erro: " + err);
  }
});

router.get("/", async (req, res)=> {
  try{
    const data = JSON.parse(await fs.readFile(global.filename));
    res.send(JSON.stringify(data)); 
  }catch(err){
    console.log(" n funcionou");
  }
});

router.post("/", async (req, res)=>{
  try{   
    
    let grade = req.body;
    const data = JSON.parse(await fs.readFile(global.filename));
    
    // novo conteudo
    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date()
    };
    data.grades.push(grade);

    // escreve novas info no arquivo
    await fs.writeFile(global.filename, JSON.stringify(data, null, 2));
    
    res.send(JSON.stringify(grade));
  }catch(err){
      res.send(`Erro: ${err}`);
  }
});

router.delete("/:id", async (req, res)=>{

  const data =  JSON.parse(await fs.readFile(global.filename));
  data.grades = data.grades.filter(grade => grade.id !== parseInt(req.params.id));
  await fs.writeFile(global.filename, JSON.stringify(data, null, 2));

  res.send(`ID ${req.params.id} - excluído com sucesso.`);
});

router.get("/:id", async (req, res)=>{
  try{
    const id = parseInt(req.params.id);
    const data =  JSON.parse(await fs.readFile(global.filename));
    const grade = data.grades.filter(grade => grade.id == id);
    
    res.send(JSON.stringify(grade));
  }catch(err){
    res.end();
    throw new Error("Erro: " + err);
    
  }
});



export default router