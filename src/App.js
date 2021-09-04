import { useState } from 'react';
import './App.sass';

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 9000000000) + 1000000000)
  const [copyMessage, setCopyMessage] = useState('Copy!')
  
  // Create random 10 digit number
  const randomNumber = () => {
    setNumber(Math.floor(Math.random() * 9000000000) + 1000000000)
  } 

  // Split numbers to individual digits 
  const numberArray = number.toString().split('').map(i => Number(i))
  console.log(numberArray);

  // Calculate control number from random 10 digits
  const controlNumber = () => {
    let remainder = 10

    for (let i = 0; i < numberArray.length; i++) {
      let digit = numberArray[i]
      let sum = digit + remainder
      let subRemainder = sum % 10
      
      if (subRemainder === 0) {
        subRemainder = 10
      }
      
      const multiplied = subRemainder * 2
      remainder = multiplied % 11
      console.log('ostatak:', remainder);
    }

    const control = 11 - remainder === 10 ? 0 : 11 - remainder
    console.log('kontrolniBroj:', control);
    return control
  }

  // Join random 10 digit number with the calculated control number
  const OIB = numberArray.concat(controlNumber()).join('')
  console.log(OIB);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(OIB)
    setCopyMessage('Copied!')
  }

  const changeMessage = () => {
    setCopyMessage('Copy!')
  }

  return (
    <div className="app">
      <h1 className="oib tooltip" onClick={() => copyToClipboard()} onMouseLeave={changeMessage}>{OIB} <span className="tooltipText">{copyMessage}</span></h1>
      <button className="button" onClick={() => randomNumber()}>Generiraj novi OIB</button>
    </div>
  );
}

export default App;
