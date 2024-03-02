import { useReducer, useState } from "react";


// ! All states centralized in Central Place (Reducer Function)
function reducer(state, action) {
  console.log(state, action); // ! const [count, dispatch] => count: current state  &&  dispatch: action (update state)

  //   return state + action;               // Todo: Plus ve Minusda duz isledi ama Onchange-de sehv oldu deye asagida ayird etmeliyik
  if (action.type === "inc") return state + action.payload;     // ! incresing
  if (action.type === "dec") return state - action.payload;     // ! decreasing
  if (action.type === "setCount") return action.payload;        // ! setting
}

function DateCounter2() {
  //   const [count, setCount] = useState(0);

  // ! useReducer: advanced State  and  first param: Function(outside), second param: initial State
  // ! count: current state (0); dispatch: used for update state call (reducer)
  const [count, dispatch] = useReducer(reducer, 0);

  const [step, setStep] = useState(1);
  const date = new Date("june 21 2027"); date.setDate(date.getDate() + count);              // This mutates the date object.  

  // ! Dispatch: Function to trigger state updates, by sending ACTION from event handler to the REDUCER Function
  const dec = () => {
    // dispatch(-1);
    dispatch({ type: "dec", payload: -1 }); // ! Action object of reducer function  (Default yazilis beledir)
    // setCount((count) => count - step);                           // setCount((count) => count - 1);
  };
  const inc = () => {
    // dispatch(1);
    dispatch({ type: "inc", payload: 1 }); // ! Bura en yuxaridaki Reducer funksiyasini ise salir -> reducer(state, action) => 0 1
    // setCount((count) => count + step);                           // setCount((count) => count + 1);
  };

  const defineCount = (e) => {
    // dispatch(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };
  const defineStep = (e) => {
    // dispatch({ type: 'setStep', payload: Number(e.target.value) })
    setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />{" "}
        <span>{step}</span>
      </div>
      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>
      <p>{date.toDateString()}</p>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter2;