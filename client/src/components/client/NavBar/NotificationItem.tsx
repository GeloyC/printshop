
import { useState } from 'react'

// icons
import Dots from '/src/assets/icon/dots.svg?react'

type notificationType = 'draft' | 'order_status'

type NotificationItemProp = {
    id: string,
    notifType: notificationType,
    message: string,
    time: string
}

function NotificationItem () {

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    return (
            <div className='relative grid grid-cols-[1fr_8fr] py-[0.3rem] items-start w-full bg-[#ffff] hover:bg-[#f2f2f2] cursor-pointer'>
                <div className='flex items-center justify-center w-full p-[0.5rem]'>
                    <div className='w-[2rem] h-[2rem] bg-[#404040]'>
                        ...
                    </div>
                </div>

                <div className='flex items-start w-full p-[0.5rem]'>
                    <div className='flex flex-col items-start w-full'>
                        <span className='text-[14px] text-[#292929] text-wrap font-bold leading-none'>Message of the notification</span>
                        <span className='text-[12px] text-[#292929]/50 font-bold'>25 hours ago</span>
                    </div>

                    <button onClick={()=>setIsDropdownOpen(open=>!open)} className='flex p-[0.3rem] cursor-pointer rounded-full hover:bg-[#B1B2B5]/35 active:bg-[#f2f2f2] transition-all duration-200'>
                        <Dots className="size-4" />
                    </button>
                </div>

                {isDropdownOpen && (
                    <div className='absolute -bottom-3 right-5 flex flex-col w-[200px] bg-[#fff] overflow-hidden rounded-[5px] shadow-lg z-50'>
                        <button className='flex items-center w-full p-[0.5rem] gap-[0.3rem] bg-[#fff] cursor-pointer'>

                            <span className='text-[14px] text-[#292929] font-bold leading-none'>asdasd</span>
                        </button>
                    </div>  
                )}
            </div>
    )
}

export default NotificationItem;
