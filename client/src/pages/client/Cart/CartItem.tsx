

// icons
import Delete from '/src/assets/icon/delete_v2.svg?react'
import Add from '/src/assets/icon/add.svg?react'
import Subtract from '/src/assets/icon/subtract.svg?react'
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'
import ConfigIcon from '/src/assets/icon/configuration-item.svg?react'
import Service from '/src/assets/icon/service.svg?react'
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react';


import type { SetStateAction } from 'react'
import type { fileItem } from '../../../types/FileType'
import currencyFormat from '../../../utils/currencyFormat'



type CartItemProp = {
    file: fileItem
    setItems: React.Dispatch<SetStateAction<fileItem[]>>
    openAlert: () => void
    openConfiguration: () => void
}

function CartItem ({
    file,
    setItems,
    openAlert,
    openConfiguration
}: CartItemProp) {
    
    const config = file?.configuration?.map(config => config.option).join(', ')

    const handleAddQuantity = (id: string) => {
        setItems(items => 
            items.map(item =>
                item.id === id 
                    ? { 
                        ...item, 
                        quantity: item.quantity + 1, 
                        total_price: ((item.unit_price ?? 0) * (item.quantity + 1)) 
                    } 
                    : item
            )
        )
    }

    const handleSubtractQuantity = (id: string) => {
        setItems(items => 
            items.map(item =>
                item.id === id 
                    ? { 
                        ...item, 
                        quantity: item.quantity - 1, 
                        total_price: ((item.unit_price ?? 0) * (item.quantity - 1)) 
                    } 
                    : item
            )
        )
    }




    return (
        <div className={`flex flex-col w-full p-[1rem] gap-[0.3rem] bg-[#fff0d3] border border-[#ffc36d] rounded-[5px]`}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[0.5rem]">
                    {/* conditionally display icon for pdf or docx file based on file extension later */}
                    {file.file.type == 'application/pdf' ? (
                        <PDFIcon className='size-6' color="#F40F02" /> 
                    ):(
                        <DOCXIcon className='size-6' color='#1B5EBE' />
                    )}

                    <span className="text-[16px] text-[#292929] font-bold leading-none">{file.file.name}</span>
                </div>

                <span className="text-[16px] font-bold text-[#ff6b00] leading-none">{currencyFormat(Number(file?.total_price))}</span>
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center w-full gap-[1rem]">
                    <div className='flex items-center gap-[0.3rem] opacity-50'>
                        <Service className='size-4' />
                        <span className="text-[14px] leading-tight">{file?.slug}</span>
                    </div> 

                    <div className='flex items-center gap-[0.3rem] opacity-50'>
                        <span className='text-[14px] leading-tight'>Unit price: {currencyFormat(Number(file?.unit_price))}</span>
                    </div>

                    <button onClick={openConfiguration} className='group flex items-center gap-[0.3rem] p-[0.3rem] px-[0.5rem] bg-[#ffc36d] active:bg-[#ffdca5] hover:opacity-100 rounded-[10px] cursor-pointer'>
                        <ConfigIcon className='size-4' />
                        <span className="text-[14px] font-bold leading-tight">{config}</span>
                        <Arrow className="size-4 rotate-180 group-hover:translate-x-1 group-active:translate-x-1 transition-all duration-100" />
                    </button>

                </div>

                {/* add quantity and delete button */}

                <div className="flex items-center gap-[1rem]">
                    <div className='flex items-center gap-[0.2rem]'>
                        <button onClick={()=>handleSubtractQuantity(file.id)} disabled={file.quantity === 1} className={`group ${file.quantity == 1 ? 'opacity-25' : 'cursor-pointer'} bg-[#fff] p-[0.3rem] rounded-[5px]`}>
                            <Subtract className={`size-5 opacity-50 ${file.quantity > 1 && 'group-hover:opacity-100 group-active:opacity-50'}`} color='#292929'/>
                        </button>
                        <div className='flex items-center justify-center p-[0.5rem] w-[2rem] bg-[#ffdca5] rounded-[5px]'>
                            <span className='text-[16px] text-[#292929]/80 font-bold leading-none'>{file.quantity}</span>
                        </div>
                        <button onClick={()=>handleAddQuantity(file.id)} className='group cursor-pointer bg-[#fff] p-[0.3rem] rounded-[5px]'>
                            <Add className="size-5 opacity-50 group-hover:opacity-100 group-active:opacity-50" color='#292929'/>
                        </button>
                    </div>

                    <button onClick={openAlert} className='group cursor-pointer p-[0.3rem] bg-[#404040]/20 hover:bg-[#ffc36d] active:bg-[#404040]/20 rounded-[5px] transition-all duration-100'>
                        <Delete className='size-5 opacity-50 group-hover:opacity-100 group-active:opacity-50' color='#292929'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem