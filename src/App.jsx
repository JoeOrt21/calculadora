import { useState } from "react";

function App() {

  const [calc, setCalc] = useState("");
  const [resultado, setResultado] = useState("");

  
  const initialState = JSON.parse (localStorage.getItem("notas")) || [];
  const [notas, setNotas] = useState(initialState);

  
  
  


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

    setNotas([...notas,{calc,resultado}]);
    localStorage.setItem("notas",JSON.stringify(notas));
    reset();
  };

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

  const handleClickNota = (index) => {
    setCalc({...notas[index]});
  }

  

  return (
    <div className="App">
      <div className="row">
      <div className="col">
        <h3>Lista</h3>
        {notas.length===0 ?(
          "No hay ninguna operacion realizada"
        ) : (
          <ol>
            {notas.map((item, index) => {
              return(
                <li key={index} onClick={() => handleClickNota(index)}>
                  {item.calc} = ({item.resultado})&nbsp;
                  
                </li>
              );
            })}
          </ol>
        )}



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
        <button
           type="button" 
           onClick={calculado}
           disabled={calc.calc==="" || calc.resultado===""}
           >=
           </button>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default App;
