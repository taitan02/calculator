import { memo } from "react";
function Button({ children, className, onClick }) {
  return (
    <button 
    className={`flex px-8 py-8 bg-[#354357] hover:opacity-60 duration-500 items-center text-white text-xl justify-center font-semibold ${className}`}
    onClick={onClick}
    >
      {children}
    </button>
  );
}

export default memo(Button);
