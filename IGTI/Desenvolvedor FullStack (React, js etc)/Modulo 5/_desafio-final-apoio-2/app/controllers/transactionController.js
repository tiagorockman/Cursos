import {db as dbconnection} from '../services/transactionService.js';

const transaction = dbconnection.transactionModel;

const getTransaction = async (req, res) => {
  try{
    console.log(transaction);
  }catch(error){
    res
    .status(500)
    .send({ message: error.message});
  }
}