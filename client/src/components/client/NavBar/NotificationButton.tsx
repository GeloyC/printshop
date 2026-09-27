
import { useState } from 'react'

// icons
import Notification from '/src/assets/icon/notification_2.svg?react'
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'
import NotificationItem from './NotificationItem';

function NotificationButton () {

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [itemDropdownId, setItemDropdownId] = useState<string>('')

    return (
        <div className='relative flex'>
            <button onClick={()=>setIsDropdownOpen(open=>!open)} className="relative group p-[0.5rem] border border-[#f2f2f2] bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-[#f2f2f2] rounded-full cursor-pointer">
                <Notification className="size-5" />

                <div className='absolute -bottom-1 -right-1 flex items-center justify-center bg-[#fff] rounded-full border border-[#B1B2B5] group-hover:bg-[#B1B2B5] group-active:bg-[#f2f2f2]'>
                    <Arrow className={`size-4 ${isDropdownOpen ? 'rotate-90' : '-rotate-90'}`} />
                </div>

                <div className='absolute -top-2 -left-2 h-[1.2rem] w-[1.2rem] flex items-center justify-center bg-[#ff6b00] rounded-full'>
                    <span className='text-[#fff] text-[12px] font-bold leading-none'>9+</span>
                </div>
            </button>

            {isDropdownOpen && (
                <div className='fade-up absolute top-[2.75rem] right-0 flex flex-col w-[300px] rounded-[5px] bg-[#fff] border border-[#404040]/25 shadow-lg'>
                    <div className='flex w-full border-b border-[#404040]/25 p-[0.5rem]'>
                        <span className='text-[14px] text-[#292929] font-bold leading-none'>Notification</span>
                    </div>

                    <div className='flex flex-col bg-[#fff]'>
                        {/* add items here */}

                        <NotificationItem />
                        <NotificationItem />
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationButton