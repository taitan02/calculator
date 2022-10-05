import {memo} from "react"
function Display({ currentCalculation = "0", previousCalculation, operator }) {
    //dùng dấu phẩy ngăn cách mỗi 3 số nguyên 
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", { 
    maximumFractionDigits: 0,
  });
  //tách phần nguyên và phần thập phân
  const formatOperand = (operand) => {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  };
  console.log("display")
  return (
    <div className='w-full py-2'>
      {/* previous */}
      <div className='py-2 px-4 h-6 flex justify-end text-xl text-white opacity-80 font-medium'>
        {formatOperand(previousCalculation)} {operator}
      </div>
      {/* current */}
      <div className={`py-2 px-4 min-h-[80px] flex break-all justify-end items-end text-6xl text-white font-semibold ${currentCalculation?"animate-down":""}`}>{formatOperand(currentCalculation)}</div>
    </div>
  );
}

export default memo(Display);
