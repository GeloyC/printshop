import { 
    createContext, 
    useState, 
    type ReactNode, 
    type Dispatch, 
    type SetStateAction, 
    useContext
} from "react";
import type { fileItem } from "../types/FileType";




type FileContextType = {
    files: fileItem[];
    setFiles: Dispatch<SetStateAction<fileItem[]>>;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
    // add selected service (service_slug)
    // add a configuration data later
};

export const FileContext = createContext<FileContextType|undefined>(undefined);


export function FileProvider ({ children }:{ children: ReactNode }) {

    const [files, setFiles] = useState<fileItem[]>([]);
    const [error, setError] = useState<string>('');
    


    return (
        <FileContext.Provider value={{ files, setFiles, error, setError }}> 
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



