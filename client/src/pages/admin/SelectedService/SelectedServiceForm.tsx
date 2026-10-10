import { useState } from "react";

// types
import type { 
    BasicInformationType, 
    Configuration, 
    SelectedServiceType
} from "../../../types/service/service";

// components
import SelectedServiceBasicInformation from "./SelectedServiceBasicInformation";
import SelectedServiceThumbnail from "./SelectedServiceThumbnail";
import SSConfiguration from "./SSConfiguration";
import ReturnButton from "../../../components/ui/ReturnButton";
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ConfigurationEditModal from "../../../components/modal/admin/ConfigurationEditModal";


type SelectedServiceFormProp = {
    service: SelectedServiceType
}

function SelectedServiceForm ({ service }: SelectedServiceFormProp) {

    const [basicInformation, setBasicInformation] = useState<BasicInformationType>({
        name: service.name,
        description: service.description,
        base_price: service.base_price
    })

    // todo: populate the configs with actual data from db
    const [configs, setConfigs] = useState<Configuration[]>(() => JSON.parse(service.configuration));

    const [selectedConfigEdit, setSelectedConfigEdit] = useState<Configuration>({
        id: crypto.randomUUID(),
        key: '',
        label: '',
        options: []
    });

    const [isConfigEditModalOpen, setIsConfigEditModalOpen] = useState<boolean>(false);


    return (
        <>
            <main className="flex flex-col w-full h-full bg-[#fff]">
                <div className="flex items-center w-full border-b border-[#292929]/10 p-[1rem] gap-[0.5rem]">
                    <ReturnButton/>
                    <span className="text-[20px] font-bold leading-none text-[#292929]">{service?.name}</span>
                </div>

                <div className="flex flex-col items-center w-full h-[675px] overflow-y-auto thin-scrollbar">
                    <SelectedServiceThumbnail />

                    <section className="flex flex-col w-[700px] p-[1rem] gap-[2rem]">
                        <SelectedServiceBasicInformation 
                            basicInformation={basicInformation}
                            setBasicInformation={setBasicInformation}
                        />
                        <SSConfiguration 
                            configs={configs}
                            setConfigs={setConfigs}
                            setSelectedConfigEdit={setSelectedConfigEdit}
                            openEditModal={()=>setIsConfigEditModalOpen(true)}
                        />
                    </section>
                </div>
            </main>

            {isConfigEditModalOpen && (
                <ModalWrapper>
                    <ConfigurationEditModal 
                        selectedConfig={selectedConfigEdit}
                        close={()=>setIsConfigEditModalOpen(false)}
                        setSelectedConfigEdit={setSelectedConfigEdit}
                        setConfigs={setConfigs}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default SelectedServiceForm;