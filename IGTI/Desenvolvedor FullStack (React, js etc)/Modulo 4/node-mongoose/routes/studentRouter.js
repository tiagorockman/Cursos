import express from 'express';
import studentModel from '../models/studentModel.js';
const app = express();

//CREATE
app.post('/student', async (req, res)=> {
try{
  const student = new studentModel(req.body);
  await student.save();
  res.send(student);

} catch(error){
  res.status(500).send(error);
}
});


//RETRIEVE
app.get('/student', async (req, res)=>{
  try{
    const student = await studentModel.find({});
    res.send(student);
  } catch(error) {
    res.status(500).send(`Erro: ${error}`);
  }
});

//UPDATE
app.patch('student/:id', async (req, res) => {
  try{
      const id = req.params.id;
     const data = await studentModel.findByIdAndUpdate({_id: id}, req.body, {new: true,});
     res.send(data);
  }catch(error){
    res.status(500).send(`Erro: ${error}`);
  }
});

//DELETE
app.delete('student/:id', async (req, res)=>{
  try{
    const id = req.params.id;
    res.send(`id: ${id}`);
   const data = await studentModel.findByIdAndDelete({_id: id});
    if(!data){
      res.status(404).send('Documento não encontrado.');
    }
    else{
      res.status(200).send();
    }
  }catch(error){
    res.status(500).send(`Erro: ${error} - ID: ${id}`);
  }
});

export  {app as studentRouter};