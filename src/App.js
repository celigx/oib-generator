import { useState, useEffect } from 'react';
import './App.sass';

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 9000000000) + 1000000000)
  const [copyMessage, setCopyMessage] = useState('Copy!')
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleWindowSize)

    return () => {
      window.removeEventListener('resize', handleWindowSize)
    }
  }, [])

  let isMobile = (width <= 768)

  const handleWindowSize = () => {
    setWidth(window.innerWidth)
  }
  
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

    // Calculate control number
    const control = 11 - remainder === 10 ? 0 : 11 - remainder
    console.log('kontrolniBroj:', control);
    return control
  }

  // Join random 10 digit number with the calculated control number
  const OIB = numberArray.concat(controlNumber()).join('')
  console.log(OIB);

  const copyToClipboard = () => {
    if (isMobile) {
      return null
    } else {
      // Copy number to clipboard on click
      navigator.clipboard.writeText(OIB)
      setCopyMessage('Copied!')
    }
  }

  const changeMessage = () => {
    setCopyMessage('Copy!')
  }

  return (
      <div className="app">
        <h1 className="title">OIB Generator</h1>
        <h1 className="oib tooltip" onClick={() => copyToClipboard()} onMouseLeave={changeMessage}>{OIB} <span className="tooltipText">{copyMessage}</span></h1>
        <button className="button" onClick={() => randomNumber()}>Generiraj novi OIB</button>
      </div>
  );
}

export default App;
