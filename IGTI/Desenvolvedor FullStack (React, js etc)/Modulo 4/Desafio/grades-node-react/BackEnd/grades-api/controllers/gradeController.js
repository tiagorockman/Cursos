import { db as dbConection } from '../models/index.js';
import { logger } from '../config/logger.js';

const db = dbConection.gradeModel;

const create = async (req, res) => {
  try {
    const newGrade =  new db(req.body);
    await newGrade.save();
    res.send({ message: 'Grade inserido com sucesso', data: JnewGrade });
    logger.info(`POST /grade - ${JSON.stringify(newGrade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const validate = async (req, res) => {
  res.send('API em execucao');
};

const findAll = async (req, res) => {
  const name = req.query.name;
  console.log(`nameparam: ${name}`);
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    console.log(`condition: ${JSON.stringify(condition)}`);
    const data = await db.find(condition);
    logger.info(`GET /grade`);

    if(!data){
      res.send("Não foi encontrado registro.")
    }else{
      res.send(JSON.stringify(data));
    }

  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.findById({_id: id});
    
    if(!data){
      res.send("Não foi encontrado registro.")
    }  else {
      res.send(data);
    }  
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {    
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await db.findByIdAndUpdate({_id: id}, req.body, {new: true});
    if(!data){
      res.send("Não foi encontrado registro.")
    }else{
      res.send(data);
    }    
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await db.findOneAndRemove({_id: id});
    if(!data){
      res.send("Não foi encontrado registro para excluir.")
    }    

    res.send(`Id foi deletado - ${id}`);

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await db.deleteMany();
    
    if(!data){
      res.send("Não foi encontrado registro para excluir.")
    }    

    res.send("Todos registros deletados");
    
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll, validate };
