import { useEffect, useState, type SetStateAction } from 'react'
import axios from 'axios'

// icons
import Delete from '/src/assets/icon/delete_v2.svg?react'
import Add from '/src/assets/icon/add.svg?react'
import Subtract from '/src/assets/icon/subtract.svg?react'
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'
import ConfigIcon from '/src/assets/icon/configuration-item.svg?react'
import Service from '/src/assets/icon/service.svg?react'
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react';


import type { fileConfigType, fileItem, SelectedOption } from '../../../types/file.type'
import currencyFormat from '../../../utils/currencyFormat'
import makeSlugCapital from '../../../utils/makeSlugCapital'
import { useAddCartItemQuantity, useDeleteCartItem, useSubtractCartItemQuantity } from '../../../hooks/cart/order_item.hook'
import { useUserContext } from '../../../context/userContext'
import ModalWrapper from '../../../components/wrapper/ModalWrapper'
import DeleteItemFromCartAlert from '../../../components/modal/client/DeleteItemFromCartAlert'
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner'




type CartItemProp = {
    order: fileItem
    openConfiguration: () => void
    setSkipDeleteConfirmation: React.Dispatch<SetStateAction<boolean>>
    skipDeleteConfirmation: boolean
}

function CartItem ({
    order,
    openConfiguration,
    setSkipDeleteConfirmation,
    skipDeleteConfirmation
}: CartItemProp) {
    
    const [deleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false);
    

    const { user } = useUserContext()
    const configuration = order?.configuration?.map(config => config.option).join(', ')

    const {mutate: addQuantity, isPending: isAddPending} = useAddCartItemQuantity(order.id, user.id);
    const {mutate: subtractQuantity, isPending: isSubtractPending} = useSubtractCartItemQuantity(order.id, user.id);
    const {mutate: deleteItem} = useDeleteCartItem(order.id, user.id);
    

    const handleOpenAlert = () => {
        if (skipDeleteConfirmation) {
            deleteItem();
            return;
        }
        setDeleteAlertOpen(true)
    }


    console.log('config on orderItem: ', order);

    return (
        <>
            <div className={`flex flex-col w-full p-[1rem] gap-[0.3rem] bg-[#fff] border border-[#292929]/25 rounded-[5px]`}>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[0.5rem]">
                        {order?.metadata?.file_type == 'application/pdf' ? (
                            <PDFIcon className='size-6' color="#F40F02" /> 
                        ):(
                            <DOCXIcon className='size-6' color='#1B5EBE' />
                        )}

                        <span className="text-[16px] text-[#292929] font-bold leading-none">{order?.metadata?.file_name}</span>
                    </div>

                    <span className="text-[16px] font-bold text-[#ff6b00] leading-none">{currencyFormat(Number(order?.total_price))}</span>
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center w-full gap-[1rem]">
                        <div className='flex items-center gap-[0.3rem] opacity-50'>
                            <Service className='size-4' />
                            <span className="text-[14px] leading-tight">{makeSlugCapital(order?.slug)}</span>
                        </div> 

                        <div className='flex items-center gap-[0.3rem] opacity-50'>
                            <span className='text-[14px] leading-tight'>Unit price: {currencyFormat(Number(order?.unit_price))}</span>
                        </div>

                        <button onClick={openConfiguration} className='group flex items-center gap-[0.3rem] p-[0.3rem] px-[0.5rem] active:bg-[#ffdca5] hover:opacity-100 rounded-[10px] cursor-pointer'>
                            <ConfigIcon className='size-4' />
                            <span className="text-[14px] font-bold leading-tight underline">{configuration}</span>
                            <Arrow className="size-4 rotate-180 group-hover:translate-x-1 group-active:translate-x-1 transition-all duration-100" />
                        </button>

                        

                    </div>

                    {/* add quantity and delete button */}

                    <div className="flex items-center gap-[1rem]">
                        <div className='flex items-center gap-[0.2rem]'>
                            <button onClick={()=>subtractQuantity()} disabled={order.quantity === 1} className={`group ${order.quantity == 1 ? 'opacity-25' : 'cursor-pointer'} bg-[#fff] p-[0.3rem] rounded-[5px]`}>
                                <Subtract className={`size-5 opacity-50 ${order.quantity > 1 && 'group-hover:opacity-100 group-active:opacity-50'}`} color='#292929'/>
                            </button>

                            <div className='flex items-center justify-center p-[0.5rem] h-[2rem] w-[2rem] bg-[#ffdca5] rounded-[5px]'>
                                {(isAddPending || isSubtractPending) ? (
                                    <LoadingSpinner color='#292929' size={15} />
                                ):(
                                    <input type="text" name="item_quantity" id={`item_quantity_${order.id}`} value={order.quantity} readOnly
                                    className='focus:outline-none w-[2rem] text-[14px] font-bold text-center'
                                    />
                                )}
                            </div>

                            <button onClick={()=>addQuantity()} className='group cursor-pointer bg-[#fff] p-[0.3rem] rounded-[5px]'>
                                <Add className="size-5 opacity-50 group-hover:opacity-100 group-active:opacity-50" color='#292929'/>
                            </button>
                        </div>

                        <button onClick={handleOpenAlert} className='group cursor-pointer p-[0.3rem]  rounded-[5px] transition-all duration-100'>
                            <Delete className='size-5 opacity-50 group-hover:opacity-100 group-active:opacity-50' color='#292929'/>
                        </button>
                    </div>
                </div>
            </div>

            {deleteAlertOpen && (
                <ModalWrapper>
                    <DeleteItemFromCartAlert 
                        filename={order?.metadata?.file_name}
                        closeAlert={()=>setDeleteAlertOpen(false)}
                        setSkipDeleteConfirmation={setSkipDeleteConfirmation}
                        skipDeleteConfirmation={skipDeleteConfirmation}
                        handleDeleteItem={()=>{
                            deleteItem()
                            setDeleteAlertOpen(false);
                        }}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default CartItem