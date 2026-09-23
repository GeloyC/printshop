import { useState } from "react"

// component
import CartItem from "./CartItem"
import OrderSummary from "./OrderSummary"
import DeleteItemFromCartAlert from "../../../components/modal/client/DeleteItemFromCartAlert"
import ModalWrapper from "../../../components/wrapper/ModalWrapper"


import { useFileContext } from "../../../context/fileContext"


function Cart () {
    
    const { files, setFiles } = useFileContext();

    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File|undefined>(undefined)

    const handleOpenDeleteAlert = (file:File) => {
        setSelectedFile(file)
        setIsDeleteAlertOpen(true)
    }


    return (
        <>
            <div className="fade-up relative flex items-start w-full py-[1rem] gap-[1rem]">
                <section className="flex flex-2 flex-col items-start w-full h-full pb-[1rem] gap-[0.5rem]">
                    <span className="text-[24px] text-[#292929] font-bold leading-none">Cart</span>

                    {/* Item block */}
                    {files.map(file => (
                            <CartItem key={file.id}
                                file={file}
                                openAlert={()=>handleOpenDeleteAlert(file.file)}
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
                        file={selectedFile}
                        closeAlert={()=>setIsDeleteAlertOpen(false)}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default Cart