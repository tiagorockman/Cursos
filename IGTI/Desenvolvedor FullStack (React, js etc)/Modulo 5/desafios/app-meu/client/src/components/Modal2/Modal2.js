// import React, { Component } from "react";
// import M from "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";

// class Modal2 extends Component {
//   componentDidMount() {
//     const options = {
//       onOpenStart: () => {
//         console.log("Open Start");
//       },
//       onOpenEnd: () => {
//         console.log("Open End");
//       },
//       onCloseStart: () => {
//         console.log("Close Start");
//       },
//       onCloseEnd: () => {
//         console.log("Close End");
//       },
//       inDuration: 250,
//       outDuration: 250,
//       opacity: 0.5,
//       dismissible: false,
//       startingTop: "4%",
//       endingTop: "10%"
//     };
//     M.Modal.init(this.Modal, options);

//     let instance = M.Modal.getInstance(this.Modal);
//     instance.open();
//     instance.close();
//     instance.destroy();
//   }

//   render() {
//     return (
//       <div>
//         <a
//           className="waves-effect waves-light btn modal-trigger"
//           data-target="modal1"
//         >
//           Modal
//         </a>

//         <div
//           ref={Modal => {
//             this.Modal = Modal;
//           }}
//           id="modal1"
//           className="modal"
//         >
//           {/* If you want Bottom Sheet Modal then add 
//                         bottom-sheet class to the "modal" div
//                         If you want Fixed Footer Modal then add
//                         modal-fixed-footer to the "modal" div*/}
//           <div className="modal-content">
//             <h4>Modal Header</h4>
//             <p>A bunch of text</p>
//           </div>
//           <div className="modal-footer">
//             <a className="modal-close waves-effect waves-red btn-flat">
//               Disagree
//             </a>
//             <a className="modal-close waves-effect waves-green btn-flat">
//               Agree
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Modal2;


import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Title, RadioButtons, Input, DateInput } from "../Modal/modal.style";
//import Backdrop from './Backdrop';

export default function Modal2( 
 { showModal,
  closeModal,
  actionModalForm, // ação do componente inicial com os dados a serem salvos
  transactionData,
  action,
}) {

   //  console.log(`show modal: ${JSON.stringify(showModal)} | ${showModal.showModal}, ${showModal.action}`);
    const [radiobutton, setRadiobutton] = useState();
    const [description, setDescription] = useState();
    const [category, setcategory] = useState();
    const [value, setValue] = useState();
    const [date, setDate] = useState();

    useEffect(() => {

    //  console.log(`Entrou useeffect modal ${transactionData}`);
      if(transactionData){
        const { description, category, value, yearMonthDay, type} = transactionData;
        
        setDescription(description);
        setcategory(category);
        setValue(value);
        setDate(yearMonthDay);
        setRadiobutton(type);
      }
    }, [transactionData]);


//cancel
const handleFormCancel = (e) => {
  e.preventDefault();
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
      description,
      category,
      value: Number(value),
      date,
    };

    actionModalForm(transaction);
  }

}
  return (
    <>
      <Container show={showModal.showModal}>
        <Title>
          <p>Novo registro</p>
          {/* <span onClick={closeModal}>
            X
          </span> */}
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

          <Input>
                  <p> Descrição </p>
                  <input
                  type='text'
                  placeholder='Digite a Descrição'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}  
                  />
          </Input>

          <Input>
                  <p> Categoria </p>
                  <input
                  type='text'
                  placeholder='Digite a Categoria'
                  onChange={(e) => setcategory(e.target.value)}
                  value={category}  
                  />
          </Input>

           <div className='doubleInputs'>
           <Input>  
                 <p className='valueInput'> Valor </p>
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
           </div>       
          
          <div className='doubleInputs'>
          <DateInput>
            <p>Data</p>
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
            <button onClick={handleFormCancel}>cancel</button>
            <button type='submit'>save</button>
          </div>
        </form>
      </Container>
      {/* <Backdrop /> */}
    </>
  )
}
