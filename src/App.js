import { useState } from 'react';
import './App.sass';

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 9000000000) + 1000000000)
  
  // Create random 10 digit number
  const randomNumber = () => {
    setNumber(Math.floor(Math.random() * 9000000000) + 1000000000)
  } 


  return (
    <div className="app">

    </div>
  );
}

export default App;
