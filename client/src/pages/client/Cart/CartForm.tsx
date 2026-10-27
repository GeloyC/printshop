import { useEffect, useState } from "react"

// component
import CartItem from "./CartItem"
import OrderSummary from "./OrderSummary"
import DeleteItemFromCartAlert from "../../../components/modal/client/DeleteItemFromCartAlert"
import ModalWrapper from "../../../components/wrapper/ModalWrapper"
import ReturnButton from "../../../components/ui/ReturnButton"
import ConfigurationSetupModal from "../../../components/modal/client/ConfigurationSetupModal"
import Toast from "../../../components/ui/Toast"


import { useCartContext } from "../../../context/cartContext"
import type { fileConfigType, fileItem } from "../../../types/FileType"


/*
* IMPORTANT NOTE
* If two files have the same name and same configuration, mark them as duplicate file
* 
* TODO: add a check box for each cart item, only the checked once are going to proceed when order is confirmed.
* the checked item will be removed after the order is confirmed
*/

type CartFormProp = {
    configurations: fileConfigType[]
}

function CartForm ({ configurations }: CartFormProp) {
    
    const { items, setItems } = useCartContext();
    const [selectedFile, setSelectedFile] = useState<fileItem|null>(null);


    const selectedConfiguration = configurations?.find(
        config => config?.slug === selectedFile?.slug
    );

    // ====================== AFTER CONFIGURATION SETUP MODAL BREAK ========================= //

    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
    const [isConfigurationOpen, setIsConfigurationOpen] = useState<boolean>(false);

    const [deleteMessage, setDeleteMessage] = useState<string>('')

    const handleOpenDeleteAlert = (file:fileItem) => {
        setSelectedFile(file)
        setIsDeleteAlertOpen(true)
    }

    const handleOpenConfiguration = (file:fileItem) => {
        setSelectedFile(file)
        setIsConfigurationOpen(true)
    }

    const handleDeleteFileFromCart = (filename:string, id: string) => {
        setItems(files => files.filter(item => item.id === id ? null : item.id))
        setIsDeleteAlertOpen(false)

        setDeleteMessage(`${filename} deleted!`)
        setTimeout(()=>setDeleteMessage(''), 3000)
    }


    useEffect(() => {
        console.log('selectedCOnfiguration: ', selectedConfiguration);
    },);

    return (
        <>
            <div className="fade-up relative flex items-start w-full py-[1rem] gap-[1rem]">
                <section className="flex flex-3 flex-col items-start w-full h-full pb-[1rem] gap-[0.5rem]">
                    <div className="flex items-center gap-[0.5rem]">
                        <ReturnButton />
                        <span className="text-[24px] text-[#292929] font-bold leading-none">Cart</span>
                    </div>

                    {/* Item block */}
                    {items.map(file => (
                            <CartItem key={file.id}
                                file={file}
                                openAlert={()=>handleOpenDeleteAlert(file)}
                                openConfiguration={()=>handleOpenConfiguration(file)}
                                setItems={setItems}
                            />
                        )
                    )}
                </section>

                <OrderSummary />
            </div>

            
            {isDeleteAlertOpen && (
                <ModalWrapper>
                    <DeleteItemFromCartAlert 
                        file={selectedFile}
                        closeAlert={()=>setIsDeleteAlertOpen(false)}
                        handleDeleteFileFromCart={handleDeleteFileFromCart}
                    />
                </ModalWrapper>
            )}

            {deleteMessage && <Toast message={deleteMessage} />} 

            {isConfigurationOpen && (
                <ModalWrapper>
                    {/* 
                        TODO: add all these required props
                        selectedFile,
                        setFiles,
                        setSelectedFile,
                        closeModal,
                        configurations,
                        setFileSetupModalOpen
                    */}

                    <ConfigurationSetupModal 
                        setFiles={setItems}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        configurations={selectedConfiguration}
                        closeModal={()=>setIsConfigurationOpen(false)}
                        setFileSetupModalOpen={setIsConfigurationOpen}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default CartForm