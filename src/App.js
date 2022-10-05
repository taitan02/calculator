import { useState, useReducer } from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import { FiDelete, FiMinus } from "react-icons/fi";
import { TiDivide } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import click from "./assets/sounds/click.mp3";
import { ACTION } from "./util/constant";
const Click = new Audio(click);
const reducer = (state, action) => {
  Click.play();
  console.log(action);
  switch (action.type) {
    case ACTION.ADD_NUMBER:
      //code
      return {
        ...state,
        currentCalculation: action.payload,
      };
    case ACTION.DELETE_NUMBER:
      return {
        ...state,
      };
    case ACTION.SELECT_OPERATION:
      if (state.previousCalculation == null)
        return {
          ...state,
          previousCalculation: state.currentCalculation,
          operator: action.payload,
          currentCalculation: null,
        };
      return {
        ...state,
        previousCalculation: calculate(state),
        operator: action.payload,
        currentCalculation: null,
      };
    case ACTION.CLEAR:
      return {};
    case ACTION.CALCULATE:
      if (!state.operator || !state.currentCalculation) return state;
      return {
        ...state,
        currentCalculation: calculate(state),
        operator: null,
        previousCalculation: null,
      };
    default:
      throw new Error("invalid action");
  }
};
//handle calculation
const calculate = ({ currentCalculation, previousCalculation, operator }) => {
  const previous = parseFloat(previousCalculation);
  const current = parseFloat(currentCalculation);
  let result;
  switch (operator) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "x":
      result = previous * current;
      break;
    case "÷":
      result = previous / current;
      break;
    default:
      throw new Error("invalid operation");
  }
  return result.toString();
};
function App() {
  const [state, dispatch] = useReducer(reducer, {});
  const [mute, setmute] = useState(false);
  const { currentCalculation, previousCalculation, operator } = state;
  return (
    <div className='w-full grid justify-center mx-auto'>
      {/* Output part*/}
      <div>
        <Display currentCalculation={currentCalculation} previousCalculation={previousCalculation} operator={operator} />
      </div>
      {/* Button part */}
      <div className='grid grid-cols-4 grid-rows-5 gap-1 sm:gap-2'>
        <Button className='col-span-2' onClick={() => dispatch({ type: ACTION.CLEAR })}>
          AC
        </Button>
        <Button onClick={() => dispatch({ type: ACTION.DELETE_NUMBER })}>
          <FiDelete />
        </Button>
        <Button onClick={() => dispatch({ type: ACTION.SELECT_OPERATION, payload: "÷" })}>
          <TiDivide />
        </Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "1" })}>1</Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "2" })}>2</Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "3" })}>3</Button>
        <Button onClick={() => dispatch({ type: ACTION.SELECT_OPERATION, payload: "x" })}>x</Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "4" })}>4</Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "5" })}>5</Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "6" })}>6</Button>
        <Button onClick={() => dispatch({ type: ACTION.SELECT_OPERATION, payload: "+" })}>
          <GoPlus />
        </Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "7" })}>7</Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "8" })}>8</Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "9" })}>9</Button>
        <Button onClick={() => dispatch({ type: ACTION.SELECT_OPERATION, payload: "-" })}>
          <FiMinus />
        </Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "0" })}>0</Button>
        <Button onClick={() => dispatch({ type: ACTION.ADD_NUMBER, payload: "." })}>.</Button>
        <Button className='col-span-2' onClick={() => dispatch({ type: ACTION.CALCULATE })}>
          =
        </Button>
      </div>
    </div>
  );
}

export default App;
