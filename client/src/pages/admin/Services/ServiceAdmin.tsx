import { Link } from 'react-router-dom';

// component

// icon
import Add from '/src/assets/icon/add-service.svg?react'
import ServiceItem from './ServiceItem';


function ServiceAdmin () {

    

    return (
        <>
            <div className="flex flex-col w-full h-full bg-[#fff] overflow-y-auto thin-scrollbar gap-[1rem]">

                <div className="flex items-center justify-between border-b border-[#292929]/10 p-[1rem]">
                    <span className="text-[20px] text-[#292929] font-bold">Service</span>
                    
                    <Link to={'/admin/service/create'} className="flex items-center bg-[#ff6b00] hover:bg-[#ff810a] active:bg-[#ff6b00] rounded-[5px] min-w-[5rem] py-[0.5rem] px-[1rem] gap-[0.5rem] cursor-pointer transition-all duration-100">
                        <Add className="size-5" fill='#fff'/>
                        <span className="text-[#fff] leading-none text-[14px] font-bold">Create Service</span>
                    </Link>
                </div>

                <div className='sticky grid grid-cols-4 w-full gap-[0.5rem] p-[2rem]'>
                    <ServiceItem />
                </div> 
            </div>
        </>
    )
}

export default ServiceAdmin;