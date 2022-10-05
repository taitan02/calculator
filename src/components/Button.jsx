import { memo, useContext } from "react";
import click from "../assets/sounds/click.mp3";
import { MainContext } from "../context/MainContext";

const Click = new Audio(click);
function Button({ children, className, onClick }) {
  const { mute } = useContext(MainContext);
  return (
    <button
      className={`relative flex px-8 py-8 bg-[#354357] items-center text-white text-xl group justify-center font-semibold ${className}`}
      onClick={() => {
        !mute && Click.play();
        onClick();
      }}
    >
      {children}
      <div className='bg-white absolute w-0 h-full top-0 left-0 rounded-xl -z-10 opacity-20 group-hover:w-full group-hover:z-10 duration-150'></div>
    </button>
  );
}

export default memo(Button);
