import express from "express";
import { promises as fs } from "fs";
import { transcode } from "buffer";
import { time } from "console";
import winston from "winston"

global.filename = "accounts.json"

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res)=>{
  try{
    let account = req.body;

    if(!account.name || account.balance == null)
        throw new Error("Name e Balance são obrigatórios");

   const data = JSON.parse(await readFile(global.filename));
   console.log(JSON.stringify(data));

    account = {id: data.nextId++, 
               name: account.name,
               balance: account.balance
              };
    data.accounts.push(account);

    await writeFile(global.filename, JSON.stringify(data, null, 2));
    
   res.send(account);
   logger.info(`POST /account - ${JSON.stringify(account)}`);
  }catch(err){
    // res.status(400).send({ error: err.message });
    next(err);
  }  
});

router.get("/", async(req, res)=>{
  try{
      const data = JSON.parse(await readFile(global.filename));
      delete data.nextId;
      res.send(data);
      logger.info(`GET / - ${JSON.stringify(data)}`);
  }catch(err) {
   // res.status(400).send({error: err.message})
   next(err);
  }
});

router.get("/:id", async (req, res)=>{
  try{
      const data = JSON.parse(await readFile(global.filename));
      const account = data.accounts.find(a => a.id === parseInt(req.params.id));
      res.send(account);
  }catch(err) {
   // res.status(400).send({error: err.message})
   next(err);
  }
});

router.delete("/:id", async(req, res)=>{
  try{
    const data = JSON.parse(await readFile(global.filename));
    data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id));
    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.end();
    logger.info(`DELETE /account/:id - ${JSON.stringify(req.params.id)}`);
  }catch(err) {
   // res.status(400).send({error: err.message})
   next(err);
  }
});
// atualiza integral, atualizar todas as propriedade
router.put("/", async (req, res)=>{
  try{
      const account = req.body;
      
      if(account.id == null)
          throw new Error("Informe um Id.");

      if(!account.name || account.balance == null)
        throw new Error("Name e Balance são obrigatórios");        

      const data = JSON.parse(await readFile(global.filename));
      const index = data.accounts.findIndex(a => a.id === account.id);

      data.accounts[index].name = account.name;
      data.accounts[index].balance = account.balance;

      await writeFile(global.filename, JSON.stringify(data));
      res.send(account);
  }catch(err) {
   // res.status(400).send({error: err.message})
   next(err);
  }
});

// atualizar parcial, atualizar algumas propriedades
router.patch("/updateBalance", async (req, res, next)=>{
  try{
    const account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex(a => a.id === account.id);

    if(account.id == null || !account.id)
        throw new Error("Campo id é obrigatório");

    if(!account.balance)
        throw new Error("Necessário informar um balance");

    data.accounts[index].balance = account.balance;
    
    await writeFile(global.filename, JSON.stringify(data));

    res.send(data.accounts[index]);
  }catch(err) {
   // res.status(400).send({error: err.message})
   next(err);
  }
});

// TRATA TODOS OS ERROS SE CASO GERAR ALGUM NAS CHAMADAS ACIMA
router.use((err, req, res, next) =>{
  console.log(err);
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
  res.status(400).send({ error: err.message });
});

export default router;
