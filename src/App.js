import Button from "./components/Button";
import Display from "./components/Display";
import { FiDelete, FiMinus} from "react-icons/fi";
import {TiDivide} from "react-icons/ti"
import { GoPlus } from "react-icons/go";
function App() {
  return (
    <div className='w-full grid justify-center mx-auto'>
      {/* Output part*/}
      <div>
        <Display />
      </div>
      {/* Button part */}
      <div className='grid grid-cols-4 grid-rows-5 gap-1 sm:gap-2'>
        <Button className='col-span-2'>AC</Button>
        <Button>
          <FiDelete />
        </Button>
        <Button><TiDivide /></Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>x</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>
          <GoPlus />
        </Button>
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button>
          <FiMinus />
        </Button>
        <Button>0</Button>
        <Button>.</Button>
        <Button className='col-span-2'>=</Button>
      </div>
    </div>
  );
}

export default App;
