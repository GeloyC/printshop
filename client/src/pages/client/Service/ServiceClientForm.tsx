import { useState } from "react";


import DisplayFiles from "./DisplayFiles"
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal";
import Toast from "../../../components/ui/Toast";
import { useFileContext } from "../../../context/fileContext";

import type { fileItem } from "../../../types/FileType";

type fileRequirement = {
    extension: string
}

type ServiceType = {
    id: string,
    name: string,
    description: string,
    file_requirements: fileRequirement[],
}

type ServiceClientFormProp = {
    service: ServiceType
}

function ServiceClientForm ({ service }: ServiceClientFormProp) {

    const [selectedFile, setSelectedFile] = useState<fileItem|null>(null);
    const { error } = useFileContext()

    const requiredFiles = service?.file_requirements.map(
        (req: { extension: string }) => req.extension
    ) ?? [];




    return (
        <>
            <div className="relative flex flex-col w-full h-full items-center gap-[1rem] py-[2rem]">
                <div className="flex flex-col w-full items-center">
                    <span className="text-[36px] text-[#292929] font-bold leading-none">{service.name}</span>
                    <p>{service.description}</p>
                </div>

                <DisplayFiles 
                    setSelectedFile={setSelectedFile}
                    requiredFiles={requiredFiles}
                />

                {error && <Toast message={error} />}
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

export default ServiceClientForm;