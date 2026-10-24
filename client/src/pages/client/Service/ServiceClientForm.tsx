import { useState } from "react";
import { useParams } from "react-router-dom";


import DisplayFiles from "./DisplayFiles"
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal";
import Toast from "../../../components/ui/Toast";

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

    const { slug } = useParams();

    console.log('slug: ', slug);

    const [selectedFile, setSelectedFile] = useState<fileItem|null>(null);
    const [files, setFiles] = useState<fileItem[]>([]);
    const [error, setError] = useState<string>('');

    const requiredFiles = service?.file_requirements.map(
        (req: { extension: string }) => req.extension
    ) ?? [];


    console.log(files.length);

    return (
        <>
            <div className="relative flex flex-col w-full h-full items-center gap-[1rem] py-[2rem]">
                <div className="flex flex-col w-full items-center gap-[0.5rem]">
                    <span className="text-6xl text-[#292929] font-bold leading-none">{service.name}</span>
                    <p>{service.description}</p>
                </div>

                <DisplayFiles 
                    setSelectedFile={setSelectedFile}
                    requiredFiles={requiredFiles}
                    setFiles={setFiles}
                    files={files}
                    setError={setError}
                    slug={String(slug)}
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