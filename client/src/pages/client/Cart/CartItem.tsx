

// icons
import Delete from '/src/assets/icon/delete_v2.svg?react'
import Add from '/src/assets/icon/add.svg?react'
import Subtract from '/src/assets/icon/subtract.svg?react'
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'


import type { SetStateAction } from 'react'
import type { fileItem } from '../../../types/FileType'



type CartItemProp = {
    file: fileItem
    setFiles: React.Dispatch<SetStateAction<fileItem[]>>
    openAlert: () => void
}

function CartItem ({
    file,
    setFiles,
    openAlert,
}: CartItemProp) {


    const handleAddQuantity = (id: string) => {
        setFiles(files => 
            files.map(file =>
                file.id === id 
                    ? { ...file, quantity: ++file.quantity } 
                    : file
            )
        )
    }

    const handleSubtractQuantity = (id: string) => {
        setFiles(files => 
            files.map(file =>
                file.id === id 
                    ? { ...file, quantity: --file.quantity } 
                    : file
            )
        )
    }

    return (
        <div className="flex flex-col w-full p-[0.75rem] gap-[0.5rem] bg-[#f2f2f2]/20 border border-[#292929]/25 rounded-[5px]">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[0.5rem]">
                    {/* conditionally display icon for pdf or docx file based on file extension later */}
                    <PDFIcon className='size-6' color="#F40F02" /> 
                    {/* <DOCXIcon className='size-6' color='#1B5EBE' /> */}

                    <span className="text-[16px] text-[#292929] font-bold leading-none">{file.file.name}</span>
                </div>

                <span className="text-[16px] font-bold text-[#ff6b00] leading-none">Php 10.00</span>
            </div>

            <div className="flex items-end justify-between w-full">
                <div className="flex flex-col w-full">
                    <span className="text-[14px] opacity-50 leading-tight">Service: Document Print</span>
                    <span className="text-[14px] opacity-50 leading-tight">Configuration: Long, Black & White</span>
                </div>

                {/* add quantity and delete button */}

                <div className="flex items-center gap-[1rem]">
                    <div className='flex items-center gap-[0.2rem]'>
                        <button onClick={()=>handleSubtractQuantity(file.id)} disabled={file.quantity === 1} className={`group ${file.quantity == 1 ? 'opacity-25' : 'cursor-pointer'} bg-[#f2f2f2] p-[0.3rem] rounded-[5px]`}>
                            <Subtract className={`size-5 opacity-50 ${file.quantity > 1 && 'group-hover:opacity-100 group-active:opacity-50'}`} color='#292929'/>
                        </button>
                        <div className='flex items-center justify-center p-[0.5rem] w-[2rem] bg-[#ffdca5] rounded-[5px]'>
                            <span className='text-[16px] text-[#292929]/80 font-bold leading-none'>{file.quantity}</span>
                        </div>
                        <button onClick={()=>handleAddQuantity(file.id)} className='group cursor-pointer bg-[#f2f2f2] p-[0.3rem] rounded-[5px]'>
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