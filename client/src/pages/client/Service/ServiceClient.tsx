import { useState } from "react";
/*
* ServiceClient component is reusable across different services
* ServiceClient component must require a urlParams 'slug' to identify which service to display
* TODO: create helper functions that will be called according to service selected.
*/

import DisplayFiles from "./DisplayFiles"
import { useFileContext } from "../../../context/documentContext"
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal";
import Toast from "../../../components/ui/Toast";

function ServiceClient () {

    const { files, setFiles } = useFileContext();
    const [selectedFile, setSelectedFile] = useState<File|null>(null);

    const [error, setError] = useState<string>('')

    return (
        <>
            <div className="relative flex flex-col w-full h-screen items-center gap-[1rem] py-[2rem]">
                <div className="flex flex-col w-full items-center">
                    <span className="text-[36px] text-[#292929] font-bold leading-none">Document Print</span>
                    <p>Display the description of the service at this section</p>
                </div>

                <DisplayFiles 
                    files={files}
                    setSelectedFile={setSelectedFile}
                    setFiles={setFiles}
                    setError={setError}
                />

                {error && (
                    <Toast message={error} />
                )}``
            </div>

            {selectedFile && (
                <ModalWrapper>
                    <ConfigurationSetupModal 
                        selectedFile={selectedFile}
                        closeModal={()=>setSelectedFile(null)}
                    />
                </ModalWrapper>
            )}

            
        </>
    )
}

export default ServiceClient