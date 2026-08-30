import { useState } from 'react';
import { Link } from 'react-router-dom';

// component

// icon
import Add from '/src/assets/icon/add-service.svg?react'
import ModalWrapper from '../../components/wrapper/ModalWrapper';
import CreateServiceModal from '../../components/modal/admin/CreateServiceModal';

function Service () {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    

    return (
        <>
            <div className="flex flex-col w-full h-full bg-[#fff] overflow-y-auto thin-scrollbar rounded-t-[15px] p-[2rem] gap-[1rem] border border-[#404040]/25">
                <div className="flex items-center justify-between border-b border-[#292929]/10 pb-[0.5rem]">
                    <span className="text-[20px] text-[#272727] font-bold leading-none">Service</span>
                    
                    <Link to={'/admin/service/create'} className="flex items-center bg-[#ff6b00] hover:bg-[#ff810a] active:bg-[#ff6b00] rounded-[10px] p-[0.5rem] px-[0.75rem] cursor-pointer transition-all duration-100">
                        <Add className="size-5" fill='#fff'/>
                        <span className="text-[#fff] leading-none pl-[0.5rem] text-[14px] font-[600]">Create Service</span>
                    </Link>
                </div>

                <div className='sticky grid grid-cols-4 w-full gap-[0.5rem]'>
                    <div className='group grid grid-rows-[5fr_2fr] h-[300px] w-full overflow-hidden cursor-pointer'>
                        <div className='bg-[#ffdca5] rounded-[10px] border border-[#fff] group-hover:border-[#ff6b00]/25' />
                        <div className='flex flex-col w-full py-[0.5rem] px-[0.2rem]'>
                            <span className='group-hover:underline group-active:text-[#292929]/75 text-[16px] text-[#292929] font-bold'>Service name</span>
                            <span className='text-[14px] text-[#292929]/50'>Created on Aug 28, 2026</span>
                            <span className='text-[16px] text-[#ff6b00] font-bold'>P10.00</span>
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