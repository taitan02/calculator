import { useState, useReducer, useContext, useEffect } from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import Sidebar from "./components/Sidebar";
import { FiDelete, FiMinus } from "react-icons/fi";
import { TiDivide } from "react-icons/ti";
import { FaEquals, FaBars, FaCalculator, FaGithub } from "react-icons/fa";
import { GoUnmute, GoMute, GoPlus, GoGraph } from "react-icons/go";
import { MdOutlineScience, MdOutlineAttachMoney, MdAccessTime } from "react-icons/md";
import { TbTemperature } from "react-icons/tb";
import { ACTIONS, FEATURES } from "./util/constant";
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
  const [isShowSidebar, setShowSidebar] = useState(false);
  const [seletedFeature, setSelectedFeature] = useState(FEATURES.STANDARD);
  const [features, setFeatures] = useState([]);
  const [state, dispatch] = useReducer(reducer, {});
  const { currentCalculation, previousCalculation, operator } = state;
  useEffect(() => {
    //Gộp 2 array
    const arrayFeatures = Object.values(FEATURES);
    const icons = [
      <FaCalculator size={20} />,
      <MdOutlineScience size={20} />,
      <GoGraph size={20} />,
      <MdOutlineAttachMoney size={20} />,
      <TbTemperature size={20} />,
      <MdAccessTime size={20} />,
    ];
    const _features = arrayFeatures.map((feature, index) => ({ feat: feature, icon: icons[index] }));
    setFeatures(_features);
  }, []);
  return (
    <div className='flex flex-col md:flex-row select-none'>
      <Sidebar onClose={() => setShowSidebar(false)} isShowSidebar={isShowSidebar} />
      <button className='w-fit md:hidden text-yellow-500 ml-5 mt-5 p-2 bg-[#151e2b]' onClick={() => setShowSidebar(true)}>
        <FaBars size={30} />
      </button>
      <div className='hidden sticky h-screen top-0 md:flex flex-col items-center md::w-1/4 bg-[#0f1722] '>
        <div className='text-white m-14 w-full flex flex-col items-center'>
          <span class='before:block before:absolute before:-inset-5  before:border-[3px] before:border-cyan-500 before:rounded-lg before:animate-rotate mb-10 relative inline-block '>
            <span class='relative text-2xl text-[#208bee] font-semibold uppercase font-serif'>Calculator</span>
          </span>
          <h3 className='text-center'>This is just a very basic calculator</h3>
        </div>
        <button className='relative p-4 bg-[#151e2b] hover:bg-opacity-50 group duration-500 text-white' onClick={() => setMute(!mute)}>
          {!mute ? <GoUnmute size={30} /> : <GoMute size={30} />}
          <div className='absolute hidden group-hover:flex justify-center items-center py-2 px-6 translate-x-2 left-full top-0 rounded-xl bg-[#354357] '>
            {!mute ? "unmute" : "mute"}
          </div>
        </button>
        <div className='grid grid-cols-2 px-4 gap-4 m-10 text-white'>
          {features.map((feature) => (
            <button
              key={feature.feat}
              onClick={() => setSelectedFeature(feature.feat)}
              className={`p-4 ${
                feature.feat === seletedFeature ? "bg-[#5a94df]" : "bg-[#151e2b]"
              } relative group hover:bg-opacity-50 rounded-lg duration-500 `}
            >
              {feature.icon}
              <div className='absolute hidden z-50 left-full top-0 translate-x-2  group-hover:flex justify-center items-center py-2 px-6 capitalize rounded-xl bg-[#354357] '>
                {feature.feat}
              </div>
            </button>
          ))}
        </div>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://github.com/taitan02/calculator'
          className=' w-14 h-14 hover:scale-125 hover:text-lime-50 duration-500'
        >
          <FaGithub className='w-full h-full' />
        </a>
      </div>
      <div className='grid justify-center items-center max-w-[360px] mx-auto  py-4'>
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
