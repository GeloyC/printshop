
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
            <button onClick={()=>{
                setIsNotifDropdownOpen(open=>!open)
                setItemDropdownId(false)
                closeAccount()
            }} className="relative group p-[0.5rem] border border-[#f2f2f2] bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-[#f2f2f2] rounded-[10px] cursor-pointer">
                <Notification className="size-5" />

                <div className='absolute -bottom-1 -right-1 flex items-center justify-center bg-[#fff] rounded-full border border-[#B1B2B5] group-hover:bg-[#B1B2B5] group-active:bg-[#f2f2f2]'>
                    <Arrow className={`size-4 ${isNotifDropdownOpen ? 'rotate-90' : '-rotate-90'}`} />
                </div>

                <div className='absolute -top-2 -left-2 h-[1.2rem] w-[1.2rem] flex items-center justify-center bg-[#ff6b00] rounded-full'>
                    <span className='text-[#fff] text-[12px] font-bold leading-none'>9+</span>
                </div>
            </button>

            {isNotifDropdownOpen && (
                <div className='fade-up absolute top-[2.75rem] right-0 flex flex-col w-[300px] rounded-[5px] bg-[#fff] border border-[#404040]/25 shadow-lg z-30'>
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