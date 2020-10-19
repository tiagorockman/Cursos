import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Title, RadioButtons, Input, DateInput } from "./modal.style";
import Backdrop from './Backdrop';
import {returnYearMonth, returnDay, returnMonth, returnYear } from '../../helpers/dataformat';

export default function Modal( {
  showModal,
  closeModal,
  submitModalForm, // ação do componente inicial com os dados a serem salvos
  transactionData,
  action,
}) {

    const [radiobutton, setRadiobutton] = useState();
    const [description, setDescription] = useState("");
    const [category, setcategory] = useState("");
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("Novo Registo");
   // console.log(`Fora do useeffect modal ${transactionData}`);

    // onload
    useEffect(() => {
      
      console.log(`Entrou useeffect modal ${JSON.stringify(transactionData)}`);
      if(transactionData){
        console.log(`interno useeffect ${JSON.stringify(transactionData)}`);
        const { description, category, value, yearMonthDay, type} = transactionData;
        if(transactionData.type != ""){
          setTitle("Edição de Registro");        
          setDescription(description);
          setcategory(category);
          setValue(value);
          setDate(yearMonthDay);
          setRadiobutton(type);
        }
         
      }
    }, [transactionData]);


//cancel
const handleFormCancel = (e) => {
  e.preventDefault();
  setTitle("Novo Registro");        
  setDescription("");
  setcategory("");
  setValue("");
  setDate("");
  setRadiobutton("");

  closeModal();
}

//submit
const handleFormSubmit = (e) => {
  e.preventDefault()

  let transaction;
  if(transactionData){
    //transação a ser editada, mais as novas informações
    transaction = {
      ...transactionData,
      description,
      category,
      value: Number(value),
      date,
    };
  } else {
    transaction = {
      ...transactionData,
      type: radiobutton,
      description,
      category,
      value: Number(value),
      month: returnMonth(date),
      day: returnDay(date),
      year: returnYear(date),
      yearMonth: returnYearMonth(date),
      yearMonthDay: date,
    };

  }
  submitModalForm(transaction);
}
  return (
    <>
      <Container show={showModal}>
        <Title>
          <p>{title}</p>
          <span onClick={handleFormCancel}>
            <i className="material-icons" >close</i>
          </span>
        </Title>

        <form onSubmit={handleFormSubmit}>
          <RadioButtons colorToShow={radiobutton}>
            <div>
              <label className='receita'>
                <input 
                  type='radio'
                  value='+'
                  checked={radiobutton === "+"}
                  onChange={(e) => {
                    setRadiobutton(e.target.value);
                  }}
                  disabled={action ==="edit"}
                />
                Receita
              </label>

              <label className='despesa'>
                <input 
                  type='radio'
                  value='-'
                  checked={radiobutton === "-"}
                  onChange={(e) => {
                    setRadiobutton(e.target.value);
                  }}
                  disabled={action ==="edit" /*Recebe true se estiver editando e desabilita a ação */}
                />
                Despesa
              </label>
            </div>
          </RadioButtons>
          <label> Descrição </label>
          <Input>                  
                  <input
                  type='text'
                  placeholder='Digite a Descrição'
                  onChange={(e) =>
                     setDescription(e.target.value)
                    }
                  value={description}  
                  />
          </Input>
          <label> Categoria </label>   
          <Input>
                  
                  <input
                  type='text'
                  placeholder='Digite a Categoria'
                  onChange={(e) => setcategory(e.target.value)}
                  value={category}  
                  />
          </Input>

          <label> Valor </label>
           <div className='doubleInputs'>
           <Input>  
                 
                 <input 
                 className='valueInput'
                 type='number'
                 min='0'
                 step='0.01'
                 placeholder='Digite o Valor'
                 onChange={(e)=> setValue(e.target.value)}
                 value={value}
                 /> 
           </Input>
          <label>Data</label>
          <DateInput>            
            <input 
            type='date'
            id='date'
            name='date'
            onChange={(e) => setDate(e.target.value)}
            value={date}
            />
          </DateInput>
          </div>
          <div className='buttons'>
            <button onClick={handleFormCancel}>cancelar</button>
            <button type='submit'>salvar</button>
          </div>
        </form>
      </Container>
      <Backdrop />
    </>
  )
}
