import { useState } from "react";
/*
* ServiceClient component is reusable across different services
* ServiceClient component must require a urlParams 'slug' to identify which service to display
* TODO: create helper functions that will be called according to service selected.
*/

import DisplayFiles from "./DisplayFiles"
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal";
import Toast from "../../../components/ui/Toast";
import { useFileContext } from "../../../context/fileContext";

import type { fileItem } from "../../../types/FileType";


function ServiceClient () {

    const [selectedFile, setSelectedFile] = useState<fileItem|null>(null);
    const { error, setError } = useFileContext()

    return (
        <>
            <div className="relative flex flex-col w-full h-full items-center gap-[1rem] py-[2rem]">
                <div className="flex flex-col w-full items-center">
                    <span className="text-[36px] text-[#292929] font-bold leading-none">Document Print</span>
                    <p>Display the description of the service at this section</p>
                </div>

                <DisplayFiles 
                    setSelectedFile={setSelectedFile}
                    setError={setError}
                />

                {error && <Toast message={error} />}
            </div>

            {selectedFile && (
                <ModalWrapper>
                    <ConfigurationSetupModal 
                        selectedFile={selectedFile.file}
                        closeModal={()=>setSelectedFile(null)}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default ServiceClient