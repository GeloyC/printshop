import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { useUserContext } from '../../../context/userContext'
import { logout } from '../../../api/user'

// icons
import Account from '/src/assets/icon/account.svg?react'
import Home from '/src/assets/icon/home.svg?react'
import Logout from '/src/assets/icon/logout.svg?react'
import Settings from '/src/assets/icon/settings.svg?react'
import type { SetStateAction } from 'react'


type AdminUserIconProp = {
    dropdown: boolean,
    setDropdown: React.Dispatch<SetStateAction<boolean>>
}


function AdminUserIcon ({
    dropdown,
    setDropdown
}: AdminUserIconProp) {

    const { user } = useUserContext();

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const handleLogout = useMutation({
        mutationFn: async () => {
            await logout();
        }, 
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate("/");
        }
    });

    return (
        <div className='relative flex flex-col h-full py-[0.3rem]'>
            <button onClick={()=>setDropdown(open=>!open)} title='Account' className={`flex items-center justify-center cursor-pointer bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] ${dropdown && 'bg-[#ffc36d]'} gap-[0.5rem] w-[2.5rem] h-[2.5rem] px-[1rem] rounded-[10px] transition-all duration-200`}>
                {user?.profile_url ? (
                    <img src={user?.profile_url} alt="" />
                ):(
                    <span className='text-[16px] text-[#292929] font-bold leading-none'>{user?.name.split('')[0]}</span>
                )}
            </button>

            {dropdown && (
                <>
                    <div onClick={()=>setDropdown(false)} className='fixed inset-0'/>
                    <div className={`absolute top-10 right-0 flex flex-col bg-[#fff] rounded-[10px] border border-[#292929]/25 shadow-lg`}>
                        <div className="flex flex-col items-start p-[1rem] gap-[0.2rem] border-b border-[#292929]/25">
                            <span className="text-nowrap text-[#292929] text-[16px] font-bold leading-none">{user?.name}</span>
                            <span className="text-[#292929] text-[14px] leading-none opacity-50">{user?.email}</span>
                        </div>

                        <div className='flex flex-col items-start p-[0.5rem]'>
                            <button className='flex items-center justify-between w-full gap-[0.5rem] p-[0.75rem] hover:bg-[#B1B2B5]/25 active:bg-[#f2f2f2] rounded-[5px] transparent-all duration-200 cursor-pointer'>
                                <span className='leading-none text-nowrap text-[#272727] text-[14px] font-bold'>Settings</span>
                                <Settings className='size-5' />
                            </button>
                            
                            <Link to="/" className='flex items-center justify-between w-full gap-[0.5rem] p-[0.75rem] hover:bg-[#B1B2B5]/25 active:bg-[#f2f2f2] rounded-[5px] transparent-all duration-200'>
                                <span className='leading-none text-nowrap text-[#272727] text-[14px] font-bold'>Go to Home</span>
                                <Home className="size-5" fill='#272727' />
                            </Link>

                            <button onClick={()=>handleLogout.mutate()} className='flex items-center justify-between w-full gap-[0.5rem] p-[0.75rem] hover:bg-[#B1B2B5]/25 active:bg-[#f2f2f2] rounded-[5px] transparent-all duration-200 cursor-pointer'>
                                <span className='leading-none text-nowrap text-[#272727] text-[14px] font-bold'>Logout</span>
                                <Logout className='size-5' />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminUserIcon;