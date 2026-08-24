import { useFileContext } from "../context/documentPrintContext";



function DocumentPrintSetup () {
    const { files } = useFileContext();

    return (
        <div className="flex flex-col items-center w-full">
            Document Print Setup

            {files.map(file => (
                <span>{file.filename}</span>
            ))}
        </div>
    )
}

export default DocumentPrintSetup;