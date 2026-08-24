import { createContext, useState, type ReactNode, type Dispatch, type SetStateAction, useContext, } from "react";

type DocumentPrintFile = {
    filename: string,
    file: File
} ;

type FileContextType = {
    files: DocumentPrintFile[];
    setFiles: Dispatch<SetStateAction<DocumentPrintFile[]>>;
};

export const FileContext = createContext<FileContextType|undefined>(undefined);

export function FileProvider ({ children }:{ children: ReactNode }) {

    const [files, setFiles] = useState<DocumentPrintFile[]>([]);
    return (
        <FileContext.Provider value={{ files, setFiles }}> 
            { children } 
        </FileContext.Provider>
    )
}


export function useFileContext() {
    const fileContext = useContext(FileContext);

    if (!fileContext) {
        throw new Error('useFileContext must be used within FileProvider');
    }

    return fileContext
}



