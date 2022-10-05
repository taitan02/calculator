function Display({currentCalculation=0,previousCalculation,operator}) {
    return ( 
    <div className="w-full py-2">
        {/* previous */}
        <div className="py-2 px-4 h-6 flex justify-end text-xl text-white opacity-80 font-bold">
            {previousCalculation} {operator}
        </div>
        {/* current */}
        <div className="py-2 px-4 h-20  flex justify-end text-6xl text-white font-bold">
            {currentCalculation}
        </div>
    </div> 
    );
}

export default Display;