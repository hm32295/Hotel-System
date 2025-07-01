import { createContext } from "react";

type ContextType = {}; 

export const Createcontext = createContext<ContextType>({});

type CreatecontextProviderProps = {
    children: any; 
};

export const CreatecontextProvider = ({ children }: CreatecontextProviderProps) => {
    return (
        <Createcontext.Provider value={{}}>
            {children}
        </Createcontext.Provider>
    );
};