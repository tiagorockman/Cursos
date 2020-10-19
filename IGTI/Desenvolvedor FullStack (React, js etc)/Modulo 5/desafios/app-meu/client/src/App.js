import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import api from './services/api';

import Modal from './components/Modal/Modal';
import Backdrop from './components/Modal/Backdrop';
import Modal2 from "./components/Modal2/Modal2";
import Trasaction from './components/Transaction';

import formatYearMonth from "./helpers/formatYearMonth.js";
import {formatCurrency} from './helpers/formatNumbers.js';
import {dateformatNow} from './helpers/dataformat.js';

import {
  Container,
  Select,
  Balanco,
  ButtonAndSearchContainer,
  Search,
  Content,
} from "./styles";


export default function App() {
  let balanceinfo = { lancamento: 0, receita: 0, despesa: 0, saldo: 0};
const [date, setDate] = useState();
const [dropdownValues, setValues] = useState([]); // valores do dropdown
const [lancamento, setLancamento] = useState(balanceinfo); // valores da barra com total, montante etc
const [transactinfo, settransactinfo] = useState(); // conteudo do grid


//Modal
const [showModal, setShowModal] = useState(false);
const [action, setAcion] = useState("add");
const [transactionEdit, setTransactionEdit] = useState();

//Search
const [searchText, setSearch] = useState("");

// ao iniciar prepara para carregar o dropdown de datas é carregada em outro state para não ficar alterando recorrente
// observa o date
 useEffect(() => {
  api.get("/getYearMoths").then(({ data }) => {
    let yearMonths = [];
    data.forEach((yearMonth) => {
      const formattedDate = formatYearMonth(yearMonth);
      yearMonths.push({ currentMonth: yearMonth, formattedDate });
    });

    setValues(yearMonths);
  });

}, [date])

// ao iniciar
useEffect(()=> {
  //seleciona data atual
  const dateNow = dateformatNow();
  setDate(dateNow)

  //pega as informações do mes atual ao iniciar
  api.get(`?period=${dateNow}`).then((res)=>{
      atualizaBalance(res.data);
      
      setLancamento(balanceinfo);
      settransactinfo(res.data);
  });
}, []);


// on Select change
useEffect(()=> {
  //pega as informações do mes atual
  api.get(`?period=${date}`).then((res)=>{
    atualizaBalance(res.data);
      
    setLancamento(balanceinfo);
    settransactinfo(res.data);
  });
}, [date]);


function atualizaBalance(data){
  balanceinfo.lancamento = data.length;

  balanceinfo.receita = data.filter((transac)=> transac.type === '+')
                            .reduce((acumulate, curr)=> {
                                return acumulate + curr.value
                                },0);
  balanceinfo.despesa = data.filter((transac)=> transac.type === '-')
                            .reduce((acumulate, curr)=>{                              
                              return acumulate + curr.value    
                            },0);

  balanceinfo.saldo = (balanceinfo.receita - balanceinfo.despesa);
  // console.log(`data: ${JSON.stringify(data)}`);
  // console.log(`balanceinfo: ${JSON.stringify(balanceinfo)}`);
}

// backButton
const handleBackButton = () => {
  const dateIndexAtual = dropdownValues.findIndex(
    (dropValue) => dropValue.currentMonth === date
  );
  setDate(dropdownValues[dateIndexAtual -1].currentMonth);
}

// nextButton
const handleNextButton = () => {
  const dateIndexAtual = dropdownValues.findIndex(
    (dropValue) => dropValue.currentMonth === date
  );
  setDate(dropdownValues[dateIndexAtual +1].currentMonth);
};

//Ações Modal
const handleEditOrAddAction = (transaction) => {
 // console.log(`entrou no edit or add ${JSON.stringify(transaction)}`);
   if(!transaction._id){ //se não tem _id é pq é para criar
      api.post('/', transaction)
      .then((res)=> {
      //  console.log("Acao de create");
      //  console.log(JSON.stringify(res));

        atualizaBalance(res.data);
      
        setLancamento(balanceinfo);
        settransactinfo(res.data);
      }).catch((err) => alert(err));
  }else{
    api.put(`/${transaction._id}`, transaction)
    .then((res)=> {

      atualizaBalance(res.data);
    
      setLancamento(balanceinfo);
      settransactinfo(res.data);
    }).catch((err) => alert(err));
  }
 
handleModalClose();
};

//search
const handleSearch = async (limpa = true) => {
  api.post('/search', {searchText, date}).then((res)=> {
    atualizaBalance(res.data);
    
    setLancamento(balanceinfo);
    settransactinfo(res.data);
    if(limpa)
      setSearch("");
  }).catch((err) => alert(err));
}

const handleEnter = (e) => {
  if(e.key === 'Enter'){
    handleSearch();
  }
}

const handleEditAction = (id) => {
 // console.log(`Edit: ${id}`)
  setAcion("edit");
  api.get(`/${id}`).then((res)=> {
    console.log(`Edit: ${JSON.stringify(res.data[0])}`)
    setTransactionEdit(res.data[0]);
  }).catch((err)=> {
    alert(`Erro ao buscar informação para editar. ${err}` )
  });

  setShowModal(true);
};

const handleDeletAction = (id) => {
  api.delete(`/${id}`)
  .then((res) => {
    atualizaBalance(res.data);
        
    setLancamento(balanceinfo);
    settransactinfo(res.data);
  })
  .catch((err) => alert(err));
}

const handleModalClose = () => {
  const clearTransactions = {
    type: "",
    description: "",
    category: "",
    value: "",
    yearMonthDay: "",
  };

  setTransactionEdit(clearTransactions);
  setShowModal(false);
};

  return (
    <>
    <Modal  showModal={showModal}
    closeModal={handleModalClose}
    submitModalForm={handleEditOrAddAction}
    transactionData={transactionEdit}
    action={action}
     />
 <Backdrop show={showModal} clicked={handleModalClose} /> 

      <Container>
      <h1>Desafio Final do Bootcamp Full Stack</h1>
        <form>
          <Select>
            <a
              className="btn-small"
              type="submit"
              name="action"
              onClick = {handleBackButton}
            >
              <i className="material-icons chevron_left">chevron_left</i>
            </a>
            <select className="browser-default" value={date} onChange={(e) => setDate(e.target.value)}>
                {!dropdownValues ? (<option>-</option>) : 
                (
                  dropdownValues.map((yearMonth)=> (
                    <option key={yearMonth.currentMonth} value={yearMonth.currentMonth}>
                      {yearMonth.formattedDate}
                    </option>
                  ))
                )
                }
              </select>

            <a
              className="btn-small"
              type="submit"
              name="action"
              onClick={handleNextButton}
            >              
              <i className="material-icons">chevron_right</i>
            </a>
          </Select>
        </form>
        <Balanco>
              <p><strong>Lançamentos:</strong>{lancamento.lancamento}</p>
              <p><strong>Receitas:</strong>{formatCurrency(lancamento.receita)}</p>
              <p><strong>Despesas:</strong>{formatCurrency(lancamento.despesa)}</p>
              <p><strong>Saldo:</strong>{formatCurrency(lancamento.saldo)}</p> 
        </Balanco>
        <ButtonAndSearchContainer>
              <button onClick={() =>{
                setShowModal(true);
                setAcion("add");
              }}><i className="material-icons" >add</i> Novo Registro</button>
          <Search>
            <p><i className="material-icons">search</i></p>

            <input
              type='text'
              placeholder='busque pela descrição'
              title="busque pela descrição"
              value={searchText}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={handleEnter}
            />
          
          </Search>
        </ButtonAndSearchContainer>
       <Content>
         <Trasaction
            transactinfo={transactinfo}
            editAction={handleEditAction}
            deleteAction={handleDeletAction}
          />
       </Content>
      </Container>
    </>
  );
}
