import express from "express";
import Accounts from "../models/Accounts.js";

const router = express.Router();

// Item 4 - Crie um endpoint para registrar um depósito em uma conta
router.patch("/account/deposit/", async (req, res, next) => {
  try {
    const account = req.body;
    let newDeposit = await validateAccount(account);
    newDeposit.balance += account.balance;
    newDeposit = new Accounts(newDeposit);
    await newDeposit.save();
    res.send(newDeposit);
  } catch (error) {
    next(error);
  }
});

// Item 5. Crie um endpoint para registrar um saque em uma conta.
router.patch("/account/withdraw/", async (req, res, next) => {
  try {
    const account = req.body;
    let newDrawMoney = await validateAccount(account);

    // valida saldo mais valor do saque antes de efetivar de fato o saque
    newDrawMoney.balance -= account.balance + 1; // valor + taxa de 1;
    if (newDrawMoney.balance < 0) {
      throw new Error("saldo insuficiente");
    }

    newDrawMoney = new Accounts(newDrawMoney);
    await newDrawMoney.save();
    res.send(newDrawMoney);
  } catch (error) {
    next(error);
  }
});

// Item 6. Crie um endpoint para consultar o saldo da conta
router.post("/account/checkBalance/", async (req, res, next) => {
  try {
    const account = req.body;
    const checkBalance = await validateAccount(account);
    res.send(checkBalance);
  } catch (error) {
    next(error);
  }
});

// Item 7. Crie um endpoint para excluir uma conta.
router.delete("/account/delete/", async (req, res, next) => {
  try {
    
    const account = req.body;
    const {agencia} = account;
    let deleteAccount = await validateAccount(account);
    deleteAccount = new Accounts(deleteAccount);
    await deleteAccount.deleteOne();
    /*res
      .status(200)
      .send(
        `{"message": "Conta de ${deleteAccount.name}, Numero: ${deleteAccount.conta} da Agencia: ${deleteAccount.agencia} excluida com sucesso"}`
      );*/
    deleteAccount = await Accounts.find({ agencia: agencia });
    //console.log(deleteAccount);
    res.send(` Quantidade de Contas Ativas na Agencia ${agencia}: ${deleteAccount.length} \n ${deleteAccount}`);
  } catch (error) {
    next(error);
  }
});

// Item 8. Crie um endpoint para realizar transferências entre contas.
router.patch("/account/transfer/", async (req, res, next) => {
  try {
    const accounts = req.body;
    const transferMoney = accounts.contaOrigem.balance;
    let sourceAccount = await validateAccount(accounts.contaOrigem);
    let targetAccount = await validateAccount(accounts.contaDestino);

    // valida se sera cobrado valor de 8 caso contas sejam de agencias diferentes
    if (sourceAccount.agencia !== targetAccount.agencia) {
      sourceAccount.balance -= 8;
    }

    // subtrai do saldo da conta origem o valor da transferencia
    // valida saldo mais valor do saque antes de efetivar de fato o saque
    sourceAccount.balance -= transferMoney; // valor + taxa de 1;
    if (sourceAccount.balance < 0) {
      throw new Error("saldo insuficiente para efetuar a transferencia");
    }

    // deposita o valor da tranferencia na conta de destino
    targetAccount.balance += transferMoney;

    // salva as alteracoes conta origem
    sourceAccount = new Accounts(sourceAccount);
    await sourceAccount.save();

    // salva as alteracoes conta destino
    targetAccount = new Accounts(targetAccount);
    await targetAccount.save();

    //retorna a conta origem com saldo atualizado
    res.send(sourceAccount);
  } catch (error) {
    next(error);
  }
});

// Item 9. Crie um endpoint para consultar a média do saldo dos clientes de determinada agência.
router.get("/account/averageBalance/:id", async (req, res, next) => {
  try {
    const idAgencia = parseInt(req.params.id);
    //console.log(idAgencia);

    let averageBalance = await Accounts.aggregate([
          {$match: { agencia: idAgencia}}, //campos precisam bater com esse id
          {$group: {_id: "$agencia", media: {$avg: "$balance"}}} //agrupe por esses campos
          //{$sort: {campo1: 1, campo2: -1}} 1- asc | -1 desc
          //{$limit: N} --limite de registros
      ],);    
    if (averageBalance.length === 0) {
      throw new Error("agencia nao encontrada");
    }
    res.send(averageBalance);
  } catch (error) {
    next(error);
  }
});

// Item 10. Crie um endpoint para consultar os clientes com o menor saldo em conta.
router.get("/account/topByBalance/:limit", async (req, res, next) => {
  try {
    const limit = parseInt(req.params.limit);
    const sort = {
      'balance': 1 //ordena balance ascendente
    };
    //console.log(limit);
    const topByBalance = await Accounts.find({}).limit(limit).sort(sort);
    if (topByBalance.length === 0) {
      throw new Error("nenhum cliente encontrado");
    }
    res.send(topByBalance);
  } catch (error) {
    next(error);
  }
});

// Item 11. Crie um endpoint para consultar os clientes mais ricos do banco.
router.get("/account/topRicher/:limit", async (req, res, next) => {
  try {
    const limit = parseInt(req.params.limit);
    const sort = {
      'balance': -1
    }
    const topRicher = await Accounts.find({}).limit(limit).sort(sort);
    if (topRicher.length === 0) {
      throw new Error("nenhum cliente encontrado");
    }
    res.send(topRicher);
  } catch (error) {
    next(error);
  }
});

// Item 12. Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada agência para a agência private agencia=99.
router.get("/account/transferToPrivate/", async (req, res, next) => {
  try {
    let transferToPrivates = await Accounts.aggregate([
      {
        $group: {
          _id: "$agencia",
          balance: { $max: "$balance" },
        },
      },
    ]);
    /*if (transferToPrivates.length === 0) {
      throw new Error("nenhuma conta apta para agencia Private");
    }*/
    for (const transferToPrivate of transferToPrivates) {
      const { _id, balance } = transferToPrivate;
      let newAccounts = await Accounts.findOne({
        agencia: _id,
        balance,
      });
      newAccounts.agencia = 99;
      await newAccounts.save();
    }
    transferToPrivates = await Accounts.find({
        agencia: 99
    });
    res.send(transferToPrivates);
  } catch (error) {
    next(error);
  }
});



router.post("/account/findByName/", async (req, res, next) => {
  try {
    const name = req.body.name;
 
    console.log(name);
    let account = await Accounts.find({name: { $regex: '.*' + name + '.*' }}).limit(10); // find like %%
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.get("/account/findByAccount/:account", async (req, res, next) => {
  try {
    const cc = parseInt(req.params.account);
 
    let account = await Accounts.find({conta: cc}).limit(10); // find like %%
    res.send(account);
  } catch (error) {
    next(error);
  }
});


// valida se agencia/conta existe
const validateAccount = async (account) => {
  //traz apenas a agencia e a conta para consulta no BD;
  const { agencia, conta } = account;
  account = {
    agencia,
    conta,
  };
  try {
    account = await Accounts.findOne(account);
    if (!account) {
      throw new Error(`(${agencia}/${conta}) agencia/conta invalida`);
    }
    return account;
  } catch (error) {
    throw new Error(error.message);
  }
};

/*router.post("/account", async (req, res, next) => {
  try {
    const account = new Accounts(req.body);
    await account.save();

    res.send(account);
  } catch (error) {
    next(error);
  }
});*/

// funcao tratamento de erro
router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
