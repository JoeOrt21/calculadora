import { useState } from "react";

function App() {

  const [calc, setCalc] = useState("");
  const [resultado, setResultado] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if(
      ops.includes(value) & calc === '' ||        
      ops.includes(value) & ops.includes(calc.slice(-1))      
    ){
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      // eslint-disable-next-line no-eval
      setResultado(eval(calc + value).toString());
    }
  }

  const crearDigitos = () => {
    const digits = [];

    for (let i = 1; i < 10; i++){
      digits.push(
        <button
          onClick={() => updateCalc(i.toString())} 
           key={i}>
            {i}
        </button>
      )
    }
    return digits;
  }

  const calculado = () =>{
    // eslint-disable-next-line no-eval
    setCalc(eval(calc).toString());
  }

  const borrar = () => {
    if(calc === ''){
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);

  }

  const reset = () =>{
     if(setCalc("") & setResultado("")){
       return;
     }
  }

  

  return (
    <div className="App">
      <div className="calculadora">
        <div className="display">
          {resultado ? <span>({resultado})</span> : ''}&nbsp;
          {calc || "0"}
        </div>

        <div className="operadores">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>

          <button onClick={borrar}>DEL</button>
          <button onClick={reset}>C</button>

        </div>

        <div className="digitos">
         {crearDigitos()} 
        <button onClick={() => updateCalc('0')}>0</button>
        <button onClick={() => updateCalc('.')}>.</button>
        <button onClick={calculado}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
