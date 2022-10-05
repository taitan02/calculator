import { memo } from "react";
function Button({ children, className, onClick }) {
  return (
    <button 
    className={`px-8 py-8 bg-[#354357] hover:opacity-60 items-center text-white text-xl font-semibold ${className}`}
    onClick={onClick}
    >
      {children}
    </button>
  );
}

export default memo(Button);
