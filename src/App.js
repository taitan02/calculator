import { useReducer, useContext } from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import { FiDelete, FiMinus } from "react-icons/fi";
import { TiDivide } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import { FaEquals } from "react-icons/fa";
import { GoUnmute, GoMute } from "react-icons/go";
import { ACTIONS } from "./util/constant";
import { MainContext } from "./context/MainContext";
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NUMBER:
      if (state.canOverwrite)
        return {
          ...state,
          currentCalculation: action.payload,
          canOverwrite: false,
        };
      return {
        ...state,
        currentCalculation: `${state.currentCalculation || ""}${action.payload}`,
      };
    case ACTIONS.DELETE_NUMBER:
      if (!state.currentCalculation) return state;
      return {
        ...state,
        currentCalculation: state.currentCalculation.slice(0, -1),
      };
    case ACTIONS.SELECT_OPERATION:
      if (!state.currentCalculation && !state.previousCalculation) return state;
      if (!state.previousCalculation)
        return {
          ...state,
          previousCalculation: state.currentCalculation,
          operator: action.payload,
          currentCalculation: null,
        };
      if (!state.currentCalculation) return { ...state, operator: action.payload };
      return {
        ...state,
        previousCalculation: calculate(state),
        operator: action.payload,
        currentCalculation: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CALCULATE:
      if (!state.operator || !state.currentCalculation) return state;
      return {
        ...state,
        currentCalculation: calculate(state),
        operator: null,
        previousCalculation: null,
        canOverwrite: true,
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
  const { mute, setMute } = useContext(MainContext);
  const [state, dispatch] = useReducer(reducer, {});
  const { currentCalculation, previousCalculation, operator } = state;
  return (
    <div className='flex'>
      <div className='hidden md:flex flex-col items-center w-1/4 bg-[#0f1722] h-screen'>
        <div className="text-white m-14">
          <h1 className='text-2xl text-center font-semibold uppercase p-4 font-serif'>calculator</h1>
          <h3>This is just a very basic calculator</h3>
        </div>
        <button className='p-4 bg-[#151e2b] hover:opacity-50 duration-500 text-white' onClick={() => setMute(!mute)}>
          {mute ? <GoUnmute size={30} /> : <GoMute size={30} />}
        </button>
      </div>
      <div className='grid justify-center items-center max-w-[360px] mx-auto'>
        {/* Output part*/}
        <div>
          <Display currentCalculation={currentCalculation} previousCalculation={previousCalculation} operator={operator} />
        </div>
        {/* Button part */}
        <div className='grid grid-cols-4 grid-rows-5 gap-1 sm:gap-2'>
          <Button
            className='col-span-2 rounded-xl bg-gradient-to-r from-[#e92d5c] to-[#ffb86c]'
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </Button>
          <Button onClick={() => dispatch({ type: ACTIONS.DELETE_NUMBER })}>
            <FiDelete />
          </Button>
          <Button className='rounded-lg' onClick={() => dispatch({ type: ACTIONS.SELECT_OPERATION, payload: "÷" })}>
            <TiDivide />
          </Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "1" })}>1</Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "2" })}>2</Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "3" })}>3</Button>
          <Button className='rounded-lg' onClick={() => dispatch({ type: ACTIONS.SELECT_OPERATION, payload: "x" })}>
            x
          </Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "4" })}>4</Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "5" })}>5</Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "6" })}>6</Button>
          <Button className='rounded-lg' onClick={() => dispatch({ type: ACTIONS.SELECT_OPERATION, payload: "+" })}>
            <GoPlus />
          </Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "7" })}>7</Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "8" })}>8</Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "9" })}>9</Button>
          <Button className='rounded-lg' onClick={() => dispatch({ type: ACTIONS.SELECT_OPERATION, payload: "-" })}>
            <FiMinus />
          </Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "0" })}>0</Button>
          <Button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "." })}>.</Button>
          <Button
            className='col-span-2 rounded-xl bg-gradient-to-l from-[#5f40e9] to-[#6fd2eb]'
            onClick={() => dispatch({ type: ACTIONS.CALCULATE })}
          >
            <FaEquals />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
