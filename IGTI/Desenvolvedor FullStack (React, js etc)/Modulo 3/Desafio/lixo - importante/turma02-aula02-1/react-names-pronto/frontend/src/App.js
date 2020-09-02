import React from 'react';
import Name from './components/Name';
import Names from './components/Names';

const ALL_VOWELS = ['a', 'e', 'i', 'o', 'u'];

function onlyVowelsFrom(text) {
  // prettier-ignore
  const newText = 
    text
      .split('')
      .filter(char => ALL_VOWELS.find(vowel => vowel === char.toLowerCase()))
      .join('');

  return newText;
}

function onlyConsonantsFrom(text) {
  // prettier-ignore
  const newText = 
    text
      .split('')
      .filter(char => !ALL_VOWELS.find(vowel => vowel === char.toLowerCase()))
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
      id: 'onlyVowels',
      description: 'Vogais',
      toggled: false,
      callback: (item) => onlyVowelsFrom(item),
    },
    {
      id: 'onlyConsonants',
      description: 'Consoantes',
      toggled: false,
      callback: (item) => onlyConsonantsFrom(item),
    },
  ]);

  React.useEffect(() => {
    const fetchNames = async () => {
      const resources = await fetch('http://localhost:3001/names');
      const names = await resources.json();
      setAllNames(names);
    };

    fetchNames();
  }, []);

  React.useEffect(() => {
    // prettier-ignore
    const callbackToExecute = 
      options.find((option) => option.toggled).callback;

    const newNamesToShow = allNames
      .filter((_, index) => index < nameCount)
      .map(callbackToExecute);

    setNamesToShow(newNamesToShow);
  }, [nameCount, options, allNames]);

  const handleRadioChange = ({ target }) => {
    const { id } = target;
    const newOptions = [...options];

    newOptions.forEach((option) => {
      option.toggled = option.id === id;
    });

    setOptions(newOptions);
  };

  const { flexRowStyle } = styles;

  return (
    <div className='container center'>
      <h1>React Names</h1>

      <div className='row' style={flexRowStyle}>
        <div className='input-field col s2'>
          <input
            id='inputNameCount'
            type='number'
            value={nameCount}
            min='0'
            max='500'
            onChange={({ target }) => setNameCount(Number(target.value))}
          />
          <label htmlFor='inputNameCount' className='active'>
            Nomes:{' '}
          </label>
        </div>

        {options.map(({ id, description, toggled }) => {
          return (
            <div key={id} className='col s2'>
              <label>
                <input
                  id={id}
                  name='radioGroup'
                  type='radio'
                  checked={toggled}
                  onChange={handleRadioChange}
                />
                <span>{description}</span>
              </label>
            </div>
          );
        })}
      </div>

      <Names>
        {namesToShow.map((name, index) => (
          <Name key={name + index}>{name}</Name>
        ))}
      </Names>
    </div>
  );
}

const styles = {
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};
