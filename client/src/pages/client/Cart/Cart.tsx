import { useState } from "react"

// component
import CartItem from "./CartItem"
import OrderSummary from "./OrderSummary"
import DeleteItemFromCartAlert from "../../../components/modal/client/DeleteItemFromCartAlert"
import ModalWrapper from "../../../components/wrapper/ModalWrapper"


import { useFileContext } from "../../../context/fileContext"
import ReturnButton from "../../../components/ui/ReturnButton"
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal"
import type { fileItem } from "../../../types/FileType"


function Cart () {
    
    const { files, setFiles } = useFileContext();

    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
    const [isConfigurationOpen, setIsConfigurationOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<fileItem|null>(null);

    const handleOpenDeleteAlert = (file:fileItem) => {
        setSelectedFile(file)
        setIsDeleteAlertOpen(true)
    }

    const handleOpenConfiguration = (file:fileItem) => {
        setSelectedFile(file)
        setIsConfigurationOpen(true)
    }


    return (
        <>
            <div className="fade-up relative flex items-start w-full py-[1rem] gap-[1rem]">
                <section className="flex flex-3 flex-col items-start w-full h-full pb-[1rem] gap-[0.5rem]">
                    <div className="flex items-center gap-[0.5rem]">
                        <ReturnButton />
                        <span className="text-[24px] text-[#292929] font-bold leading-none">Cart</span>
                    </div>

                    {/* Item block */}
                    {files.map(file => (
                            <CartItem key={file.id}
                                file={file}
                                openAlert={()=>handleOpenDeleteAlert(file)}
                                openConfiguration={()=>handleOpenConfiguration(file)}
                                setFiles={setFiles}
                            />
                        )
                    )}
                </section>

                <OrderSummary />
            </div>


            {isDeleteAlertOpen && (
                <ModalWrapper>
                    <DeleteItemFromCartAlert 
                        file={selectedFile?.file}
                        closeAlert={()=>setIsDeleteAlertOpen(false)}
                    />
                </ModalWrapper>
            )}

            {isConfigurationOpen && (
                <ModalWrapper>
                    <ConfigurationSetupModal 
                        selectedFile={selectedFile}
                        closeModal={()=>setIsConfigurationOpen(false)}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default Cart