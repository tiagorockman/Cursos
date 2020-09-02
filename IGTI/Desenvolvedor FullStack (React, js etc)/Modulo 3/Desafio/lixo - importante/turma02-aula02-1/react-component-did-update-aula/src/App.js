import React from 'react';

export default function App() {
  const [paragraph1, setParagraph1] = React.useState('');
  const [paragraph2, setParagraph2] = React.useState('');
  const [paragraph2Length, setParagraph2Length] = React.useState(0);

  React.useEffect(() => {
    document.title = paragraph1.length;
  }, [paragraph1]);

  React.useEffect(() => {
    setParagraph2Length(paragraph2.length);
  }, [paragraph2]);

  const handleParagraph1 = (event) => {
    console.log('handleParagraph1');
    //this.setState({ paragraph1: event.target.value });
    const newParagraph1 = event.target.value;
    setParagraph1(newParagraph1);
  };

  const handleParagraph2 = (event) => {
    console.log('handleParagraph2');
    //this.setState({ paragraph2: event.target.value });

    const newParagraph2 = event.target.value;
    setParagraph2(newParagraph2);
  };

  // componentDidUpdate(_, previousState) {
  //   console.log('didUpdate');

  //   const {
  //     paragraph1: oldParagraph1,
  //     paragraph2: oldParagraph2,
  //   } = previousState;

  //   const { paragraph1: newParagraph1, paragraph2: newParagraph2 } = this.state;

  //   if (oldParagraph1 !== newParagraph1) {
  //     console.log('Alterando título da aba');
  //     // Título da aba
  //     document.title = this.state.paragraph1.length;
  //   }

  //   if (oldParagraph2 !== newParagraph2) {
  //     this.setState({ lengthParagraph2: this.state.paragraph2.length });
  //   }
  // }

  return (
    <div className='container'>
      <h1>React componentDidUpdate</h1>

      <input
        type='text'
        placeholder='Digite aqui'
        value={paragraph1}
        onChange={handleParagraph1}
      />

      <input
        type='text'
        placeholder='Digite aqui'
        value={paragraph2}
        onChange={handleParagraph2}
      />

      <p>Parágrafo 1: {paragraph1}</p>
      <p>Parágrafo 2: {paragraph2}</p>
      <p>Soma de caracteres do parágrafo 2: {paragraph2Length}</p>
    </div>
  );
}
