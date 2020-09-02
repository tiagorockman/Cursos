import React from 'react';
import Names from './components/Names';
import Name from './components/Name';

const ALL_VOWELS = ['a', 'e', 'i', 'o', 'u'];

function onlyVowelsFrom(text) {
  const newText = text
    .split('')
    .filter((char) => ALL_VOWELS.includes(char.toLowerCase()))
    .join('');

  return newText;
}

function onlyConsonantsFrom(text) {
  const newText = text
    .split('')
    .filter((char) => !ALL_VOWELS.includes(char.toLowerCase()))
    .join('');

  return newText;
}

export default function App() {
  const [allNames, setAllNames] = React.useState([]);
  const [namesToShow, setNamesToShow] = React.useState([]);
  const [nameCount, setNameCount] = React.useState(0);

  const [options, setOptions] = React.useState([
    {
      id: 'normal',
      description: 'Normal',
      toggled: true,
      callback: (item) => item,
    },
    {
      id: 'vowels',
      description: 'Vogais',
      toggled: false,
      callback: (item) => onlyVowelsFrom(item),
    },
    {
      id: 'consonants',
      description: 'Consoantes',
      toggled: false,
      callback: (item) => onlyConsonantsFrom(item),
    },
    {
      id: 'name_length',
      description: 'Nome + tamanho',
      toggled: false,
      callback: (item) => `${item} (${item.length})`,
    },
  ]);

  React.useEffect(() => {
    const fetchData = async () => {
      const resources = await fetch('http://localhost:3001/names');
      const json = await resources.json();

      setAllNames([...json]);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    // prettier-ignore
    // const callbackToBeExecuted =
    //   options.find((option) => option.toggled).callback;
    const toggledOption = options.find((option) => option.toggled);
    const callbackToBeExecuted = toggledOption.callback;

    const newNamesToShow = allNames
      .filter((_, index) => index < nameCount)
      .map(callbackToBeExecuted);

    setNamesToShow(newNamesToShow);
  }, [nameCount, options]);

  const handleRadioGroupChange = ({ target }) => {
    const { id } = target;
    const newOptions = [...options];

    newOptions.forEach((option) => {
      //console.log(`${option.id} === ${id}`);
      option.toggled = option.id === id;
    });

    setOptions(newOptions);
  };

  return (
    <div className='container'>
      <h1 className='center'>React Names</h1>

      <div className='input-field'>
        <input
          id='inputNameCount'
          type='number'
          value={nameCount}
          onChange={({ target }) => setNameCount(Number(target.value))}
        />
        <label htmlFor='inputNameCount' className='active'>
          Quantidade de nomes:{' '}
        </label>
      </div>

      {options.map(({ id, description, toggled }) => {
        return (
          <label key={id}>
            <input
              id={id}
              name='radioGroup'
              type='radio'
              checked={toggled}
              onChange={handleRadioGroupChange}
            />
            <span>{description}</span>
          </label>
        );
      })}

      <Names>
        {namesToShow.map((name, index) => {
          return <Name key={`${name}_${index}`}>{name}</Name>;
        })}
      </Names>
    </div>
  );
}
