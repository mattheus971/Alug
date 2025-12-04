import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    return (
        <GlobalContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </GlobalContext.Provider>
    );
};
