import { Link } from 'react-router-dom'
import { useState } from 'react'

// icons
import Account from '/src/assets/icon/account.svg?react'
import Home from '/src/assets/icon/home.svg?react'
import Notification from '/src/assets/icon/notification.svg?react'
import Logout from '/src/assets/icon/logout.svg?react'
import Settings from '/src/assets/icon/setttings.svg?react'

function TopNavAdmin () {

    const [dropDown, setDropDown] = useState<boolean>(false);

    return (
        <div className="sticky top-0 flex items-center justify-end w-full h-[4rem] z-10">
            <button className='hover:bg-[#ffc36d] active:bg-[#ffc36d]/50 p-[0.3rem] border-2 border-transparent rounded-full cursor-pointer'>
                <Notification className='size-6' fill='#272727' />
            </button>

            <div className='relative flex flex-col'>
                <button onClick={()=>setDropDown(open=>!open)} title='Account' className={`flex items-center cursor-pointer hover:bg-[#ffc36d] active:bg-[#ffc36d]/50 ${dropDown ? 'bg-[#ffc36d] border-2 border-[#fff] rounded-t-[10px]' : 'border-2 border-transparent rounded-[10px]'} p-[0.5rem]`}>
                    <Account className='size-6 rounded-full' fill='#272727'/>
                    <span className='text-[#272727] px-[0.5rem] font-bold leading-tight'>Angelo Cabangal</span>
                </button>

                {dropDown && (
                    <>
                        <div onClick={()=>setDropDown(false)} className='fixed inset-0'/>
                        <div className={`absolute top-10 right-0 flex flex-col w-full p-[0.5rem] gap-[0.5rem] ${dropDown ? 'border-2 border-[#fff] border-t-transparent rounded-b-[10px]' : 'rounded-[10px]'} bg-[#ffc36d] shadow-lg`}>
                            <button className='flex items-center justify-between w-full gap-[0.5rem] p-[0.5rem] hover:bg-[#fff8ec] active:bg-[#ffdca5]/50 rounded-[5px] transparent-all duration-100 cursor-pointer'>
                                <span className='leading-none text-nowrap text-[#272727] text-[14px] font-bold'>Settings</span>
                                <Settings className='size-5' />
                            </button>
                            
                            <Link to="/" className='flex items-center justify-between w-full gap-[0.5rem] p-[0.5rem] hover:bg-[#fff8ec] active:bg-[#ffdca5]/50 rounded-[5px] transparent-all duration-100'>
                                <span className='leading-none text-nowrap text-[#272727] text-[14px] font-bold'>Go to Home</span>
                                <Home className="size-5" fill='#272727' />
                            </Link>

                            <button className='flex items-center justify-between w-full gap-[0.5rem] p-[0.5rem] hover:bg-[#fff8ec] active:bg-[#ffdca5]/50 rounded-[5px] transparent-all duration-100 cursor-pointer'>
                                <span className='leading-none text-nowrap text-[#272727] text-[14px] font-bold'>Logout</span>
                                <Logout className='size-5' />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default TopNavAdmin