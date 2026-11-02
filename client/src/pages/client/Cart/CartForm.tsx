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
import type { fileConfigType, fileItem } from "../../../types/file.type"
import ConfigurationSetupModalCart from "../../../components/modal/client/ConfigurationSetupModalCart"


/*
* IMPORTANT NOTE
* If two files have the same name and same configuration, mark them as duplicate file
* 
* TODO: add a check box for each cart item, only the checked once are going to proceed when order is confirmed.
* the checked item will be removed after the order is confirmed
*/

type CartFormProp = {
    configurations: fileConfigType[]
    orderItems: fileItem[]
}

function CartForm ({ configurations, orderItems }: CartFormProp) {


    const [skipDeleteConfirmation, setSkipDeleteConfirmation] = useState<boolean>(false);
    const [itemSetupModalOpen, setItemSetupModalOpen] = useState<boolean>(false);

    const [selectedItemId, setSelectedItemId] = useState<string>('')
    const selectedItem = orderItems.find(item => item.id === selectedItemId); // contains data of the selected item
    const selectedConfigurationPerService = configurations.find(item => item.slug === selectedItem?.slug);

    const subTotalPrice = orderItems.reduce(
        (acc, items) => acc + (Number(items.total_price) 
        ?? 0), 0);


    const handleOpenConfiguration = (item: fileItem) => {
        setItemSetupModalOpen(true);
        setSelectedItemId(item.id);
    }


    return (
        <>
            <div className="relative grid flex-1 grid-cols-[5fr_2fr] items-stretch w-full gap-[1rem]">

                <section className="flex flex-col items-start w-full min-h-full gap-[1rem] rounded-t-[15px]">
                    <div className="flex items-center gap-[0.5rem]">
                        <ReturnButton 
                            color="#292929"
                        />
                        <span className="text-[24px] text-[#292929] font-bold leading-none">Cart</span>
                    </div>

                    {/* Item block */}
                    <div className="flex flex-col w-full gap-[0.5rem]">
                        {orderItems.map(order => (
                            <CartItem key={order.id}
                                order={order}
                                openConfiguration={()=>handleOpenConfiguration(order)}
                                setSkipDeleteConfirmation={setSkipDeleteConfirmation}
                                skipDeleteConfirmation={skipDeleteConfirmation}
                            />
                        ))}
                    </div>
                </section>

                <OrderSummary 
                    fileQuantity={orderItems.length}
                    subTotalPrice={subTotalPrice}
                />
            </div>

            


            {itemSetupModalOpen && (
                <ModalWrapper>
                    <ConfigurationSetupModalCart 
                        closeModal={()=>setItemSetupModalOpen(false)}
                        selectedItem={selectedItem}
                        configurations={selectedConfigurationPerService}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default CartForm