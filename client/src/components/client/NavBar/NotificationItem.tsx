
import { type SetStateAction } from 'react'

// icons
import Dots from '/src/assets/icon/dots.svg?react'
import MarkAsRead from '/src/assets/icon/seen.svg?react'
import Delete from '/src/assets/icon/delete_v2.svg?react'

type notificationType = 'draft' | 'order_status'

export type NotificationItem = {
    id: string,
    notifType: notificationType,
    message: string,
    time: string
}

type NotificationItemProp = {
    itemDropdownId: boolean,
    setItemDropdownId: React.Dispatch<SetStateAction<boolean>> // change the type to string later for id
}

function NotificationItem ({
    itemDropdownId,
    setItemDropdownId
}: NotificationItemProp) {


    return (
        <div className='relative'>
            <div className='grid grid-cols-[1fr_8fr] py-[0.3rem] items-start w-full bg-[#ffff] hover:bg-[#f2f2f2] cursor-pointer'>
                <div className='flex items-center justify-center w-full p-[0.5rem]'>
                    <div className='w-[2rem] h-[2rem] bg-[#404040]'>
                        ...
                    </div>
                </div>

                <div className='relative flex items-start w-full p-[0.5rem]'>
                    <div className='flex flex-col items-start w-full'>
                        <span className='text-[14px] text-[#292929] text-wrap font-bold leading-none'>Message of the notification</span>
                        <span className='text-[12px] text-[#292929]/50 font-bold'>25 hours ago</span>
                    </div>

                    <button onClick={()=>setItemDropdownId(open=>!open)} className='flex p-[0.3rem] cursor-pointer rounded-full hover:bg-[#B1B2B5]/35 active:bg-[#f2f2f2] transition-all duration-200'>
                        <Dots className="size-4" />
                    </button>

                </div>
            </div>

            {itemDropdownId && (
                <div className='absolute top-8 right-6 flex flex-col w-[200px] py-[0.3rem] bg-[#fff] border border-[#404040]/15 overflow-hidden rounded-[5px] shadow-lg'>
                    <button className='flex items-center w-full p-[0.5rem] gap-[0.3rem] bg-[#fff] hover:bg-[#f2f2f2] active:bg-[#fff] cursor-pointer'>
                        <MarkAsRead className='size-4 opacity-80' />
                        <span className='text-[14px] text-[#292929] font-bold leading-none'>Mark as read</span>
                    </button>
                    <button className='flex items-center w-full p-[0.5rem] gap-[0.3rem] bg-[#fff] hover:bg-[#f2f2f2] active:bg-[#fff] cursor-pointer'>
                        <Delete className='size-4 opacity-80' />
                        <span className='text-[14px] text-[#292929] font-bold leading-none'>Delete</span>
                    </button>
                </div>  
            )}
        </div>
    )
}

export default NotificationItem;
