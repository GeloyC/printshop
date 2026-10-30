
import { useState, type SetStateAction } from 'react'

// icons
import Notification from '/src/assets/icon/notification_2.svg?react'
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'
import NotificationItem from './NotificationItem';

type NotificationButtonProp = {
    isNotifDropdownOpen: boolean,
    setIsNotifDropdownOpen: React.Dispatch<SetStateAction<boolean>>
    closeAccount: () => void
}

function NotificationButton ({
    isNotifDropdownOpen,
    setIsNotifDropdownOpen,
    closeAccount
}:NotificationButtonProp) {

    const [itemDropdownId, setItemDropdownId] = useState<boolean>(false) // change this to id later

    return (
        <div className='relative'>
            <button className="relative group flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-[#f2f2f2] active:bg-[#f2f2f2] rounded-[10px] cursor-pointer"
                onClick={()=>{
                    setIsNotifDropdownOpen(open=>!open)
                    setItemDropdownId(false)
                    closeAccount()
                }}
            >
                <Notification className="size-6" />

                <div className='absolute -bottom-1 -right-1 flex items-center justify-center bg-[#fff] rounded-full border border-[#B1B2B5] group-hover:bg-[#B1B2B5] group-active:bg-[#f2f2f2]'>
                    <Arrow className={`size-4 ${isNotifDropdownOpen ? 'rotate-90' : '-rotate-90'}`} />
                </div>

                <div className='absolute -top-1 -left-1 h-[1.2rem] w-[1.2rem] flex items-center justify-center bg-[#ff6b00] border-2 border-[#fff] rounded-full'>
                    <span className='text-[#fff] text-[12px] font-bold leading-none'>0</span>
                </div>
            </button>

            {isNotifDropdownOpen && (
                <div className='fade-up absolute top-[2.75rem] right-0 flex flex-col w-[300px] rounded-[10px] overflow-hidden bg-[#fff] border border-[#404040]/25 shadow-lg z-30'>
                    <div className='flex w-full border-b border-[#404040]/25 p-[0.5rem]'>
                        <span className='text-[14px] text-[#292929] font-bold leading-none'>Notification</span>
                    </div>

                    <div className='flex flex-col bg-[#fff]'>
                        {/* add items here */}

                        <NotificationItem 
                            itemDropdownId={itemDropdownId}
                            setItemDropdownId={setItemDropdownId}
                        />
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default NotificationButton