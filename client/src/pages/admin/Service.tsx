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
            <div className="flex flex-col w-full h-full bg-[#fff] overflow-y-auto thin-scrollbar gap-[1rem]">

                <div className="flex items-center justify-between border-b border-[#292929]/10 p-[1rem]">
                    <span className="text-[20px] text-[#292929] font-bold">Service</span>
                    
                    <Link to={'/admin/service/create'} className="flex items-center bg-[#ff6b00] hover:bg-[#ff810a] active:bg-[#ff6b00] min-w-[5rem] py-[0.5rem] px-[1rem] gap-[0.5rem] cursor-pointer transition-all duration-100">
                        <Add className="size-5" fill='#fff'/>
                        <span className="text-[#fff] leading-none text-[14px] font-bold">Create Service</span>
                    </Link>
                </div>

                <div className='sticky grid grid-cols-4 w-full gap-[0.5rem] p-[2rem]'>
                    <Link to={'/admin/service/service_name'} className='group grid grid-rows-[5fr_2fr] h-[300px] w-full overflow-hidden cursor-pointer'>
                        <div className='bg-[#ffdca5] border border-[#fff] group-hover:border-[#ff6b00]/25' />
                        <div className='flex flex-col w-full py-[0.5rem] px-[0.2rem]'>
                            <span className='group-hover:underline group-active:text-[#292929]/75 text-[16px] text-[#292929] font-bold'>Service name</span>
                            <span className='text-[14px] text-[#292929]/50'>Created on Aug 28, 2026</span>
                            <span className='text-[16px] text-[#ff6b00] font-bold'>P10.00</span>
                        </div>
                    </Link>
                    
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