import { createContext, useContext } from "react";

const storeContext = createContext();

export const StoreProvider = ({ children }) => {
    const value = "hello"
    return (
        <storeContext.Provider value={value}>
            {children}
        </storeContext.Provider>
    )
};

export const useStore = () => {
    return useContext(storeContext)
}
