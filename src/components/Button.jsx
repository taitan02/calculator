
function Button({children,className}) {
    return ( 
        <button className={`px-8 py-8 bg-[#354357] hover:opacity-60 items-center text-white text-xl font-semibold ${className}`}>
            {children}
        </button>
     );
}

export default Button;