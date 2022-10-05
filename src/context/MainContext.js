import { createContext, useState } from "react";

export const MainContext = createContext()
const MainProvider = ({children})=>{
    const [mute, setMute] = useState(false);
return (
    <MainContext.Provider value={{mute,setMute}}>
        {children}
    </MainContext.Provider>
)
}
export default MainProvider