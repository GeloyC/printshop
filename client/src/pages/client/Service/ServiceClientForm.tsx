import { useState } from "react";
import { useParams, useBlocker } from "react-router-dom";


import DisplayFiles from "./DisplayFiles"
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal";
import Toast from "../../../components/ui/Toast";

import type { fileItem } from "../../../types/FileType";
import RedirectAlert from "../../../components/ui/RedirectAlert";
import type { Configuration } from "../../../types/service/service";



type fileRequirement = {
    extension: string
}

type ServiceType = {
    id: string,
    name: string,
    description: string,
    file_requirements: fileRequirement[],
}

type fileConfigType = {
    id: string,
    configuration: Configuration[],
    slug: string
}

type ServiceClientFormProp = {
    service: ServiceType
    configuration: fileConfigType
}

function ServiceClientForm ({ service, configuration }: ServiceClientFormProp) {

    const { slug } = useParams();
    console.log('check config per service: ', configuration);


    const [selectedFile, setSelectedFile] = useState<fileItem|null>(null);
    const [files, setFiles] = useState<fileItem[]>([]);
    const [error, setError] = useState<string>('');


    const requiredFiles = service?.file_requirements.map(
        (req: { extension: string }) => req.extension
    ) ?? [];


    // TODO: use useBlocker from react-router to alert user when navigating away from /service/[selected service slug]

    const filesSlugCheckExist = files.some(file => file.slug === slug);
    const blocker = useBlocker(files.length >= 1 && filesSlugCheckExist);

    const handleProceed = () => {
        if (filesSlugCheckExist) {
            setFiles(prevFiles =>
                prevFiles.filter(file => file.slug !== slug)
            );
        }

        if (blocker.state === 'blocked') {
            blocker.proceed()
        }
    }

    const handleStay = () => {
        if (blocker.state === 'blocked') {
            blocker.reset()
        }
    }

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
                        configuration={configuration}
                    />
                </ModalWrapper>
            )}

            {blocker.state === 'blocked' && (
                <ModalWrapper>
                    <RedirectAlert 
                        stayPage={handleStay}
                        leavePage={handleProceed}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default ServiceClientForm;