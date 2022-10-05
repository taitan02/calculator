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
  return (
    <div className='w-full py-2'>
      {/* previous */}
      <div className='py-2 px-4 h-6 flex justify-end text-xl text-white opacity-80 font-bold'>
        {formatOperand(previousCalculation)} {operator}
      </div>
      {/* current */}
      <div className='py-2 px-4 h-20  flex justify-end text-6xl text-white font-bold'>{formatOperand(currentCalculation)}</div>
    </div>
  );
}

export default Display;
