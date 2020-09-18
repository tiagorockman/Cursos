const express = require('express');
const transactionRouter = express.Router();
const TransactionModel = require('../models/TransactionModel');
const mongoose = require('mongoose');


//rota de seleção
transactionRouter.get('/', async (req, res, next) => {
    try{
      if(!req.query.period)
        res.status(400).send({ message: 'É necessário informar o período no formato yyyy-mm'});

     const result = await TransactionModel.find({yearMonth: req.query.period}).sort({yearMonthDay: 1});
     if(!result)
      res.status(400).send({ message: 'Não foi encontrado informações'});

     res.send(result);
    }catch(error){
     next(error);
    }
  });

// rota de create
transactionRouter.post('/', async (req, res, next) => {
  if(!req.body)
  res.status(400).send({ message: 'É necessário informar os dados para inserir'});

  try{
    const newTrans = new TransactionModel(req.body);
    await newTrans.save();
     const result = await TransactionModel.find({yearMonth: newTrans.yearMonth}).sort({yearMonthDay: 1});
    res.send(result)
  }catch(error){
   next(error);
  }
});

//search
transactionRouter.post('/search', async(req, res, next) => {
  if(!req.body.searchText || !req.body.date)
    res.status(400).send(`Erro ao buscar informações.`)
  try {
const condition= {
  'description': new RegExp(`.*${req.body.searchText}.*`), 
  'yearMonth': `${req.body.date}`
}
// console.log(condition);

    const data = await TransactionModel.find(condition);
   res.send(data)
  } catch (error) {
    
  }
});

// rota de update
transactionRouter.put('/:id', async (req, res, next) => {
  if(!req.body)
  res.status(400).send({ message: 'É necessário informar os dados para inserir'});

  try{
  const data = await TransactionModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
  if(!data)
    res.send({ message: 'Não foi encontrado registro para atualização'});

  const result = await TransactionModel.find({yearMonth: data.yearMonth}).sort({yearMonthDay: 1});
  res.send(result);
  }catch(error){
   next(error);
  }
});
// rota de delete
transactionRouter.delete('/:id', async (req, res, next) => {
  try{
    if(!req.params.id)
      res.status(400).send('É necessário informar o id');

    const result = await TransactionModel.findByIdAndRemove({_id: req.params.id});
    const data = await TransactionModel.find({yearMonth: result.yearMonth})
    res.send(data);
  }catch(error){
   next(error);
  }
});

//get all yearMoths
transactionRouter.get('/getYearMoths', async (_, res, next)=>{
  try {
    const data = await TransactionModel.distinct("yearMonth");
    res.send(data);
  } catch (error) {
    next(error);
  }
})
//get all category
transactionRouter.get('/getCategories', async (_, res, next)=>{
  try {
    const data = await TransactionModel.distinct("category");
    res.send(data);
  } catch (error) {
    next(error);
  }
})

//get by id
transactionRouter.get('/:id', async (req, res, next)=>{
  if(!req.params.id)
    res.status(400).send({message: 'Id para busca não informado'});
  
  try {
    const data = await TransactionModel.find({_id: req.params.id});
    res.send(data);
  } catch (error) {
    next(error);
  }
})

transactionRouter.use((err, req, res, next) => {
  // console.log(err);
  res
  .status(500)
  .send({ message: err.message});
});

module.exports = transactionRouter;
