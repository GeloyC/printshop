import { useState } from 'react';

// component

// icon
import Add from '/src/assets/icon/add-service.svg?react'
import ModalWrapper from '../../components/wrapper/ModalWrapper';
import CreateServiceModal from '../../components/modal/admin/CreateServiceModal';

function Service () {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    

    return (
        <>
            <div className="flex flex-col w-full h-full bg-[#fff] overflow-y-auto thin-scrollbar rounded-t-[15px] p-[2rem] gap-[2rem] border border-[#404040]/25">
                <div className="flex items-start justify-between">
                    <span className="text-[28px] text-[#272727] font-bold leading-none">Service</span>
                    
                    <button onClick={()=>setIsModalOpen(true)} className="flex items-center bg-[#ff6b00] hover:bg-[#ff810a] active:bg-[#ff6b00] rounded-[10px] p-[0.5rem] px-[0.75rem] cursor-pointer transition-all duration-100">
                        <Add className="size-6" fill='#fff'/>
                        <span className="text-[#fff] leading-none pl-[0.5rem] text-[16px] font-[600]">Create Service</span>
                    </button>
                </div>

                <div className='sticky grid grid-cols-4 w-full gap-[0.5rem]'>
                    <div className='group grid grid-rows-[5fr_2fr] h-[300px] w-full overflow-hidden cursor-pointer'>
                        <div className='bg-[#ffdca5] rounded-[10px] border border-[#fff] group-hover:border-[#ff6b00]/25' />
                        <div className='flex flex-col w-full py-[0.5rem] px-[0.2rem]'>
                            <span className='group-hover:underline group-active:text-[#292929]/75 text-[18px] text-[#292929] font-bold'>Service name</span>
                            <span className='text-[14px] text-[#292929]/50 font-bold'>Created on Aug 28, 2026</span>
                            <span className='text-[18px] text-[#ff6b00] font-bold'>P10.00</span>
                        </div>
                    </div>
                    
                </div>
            </div>

            {isModalOpen && (
                <ModalWrapper>
                    <CreateServiceModal 
                        close={()=>setIsModalOpen(false)}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default Service;