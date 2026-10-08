
import { logout } from "../../../api/user";
import type { UserType } from "../../../types/UserType";
import { type SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type UserAccountIconProp = {
    user: UserType,
    setIsAccountDropdownOpen: React.Dispatch<SetStateAction<boolean>>
    isAccountDropdownOpen: boolean
    closeNotif: ()=>void
}

function UserAccountIcon ({ 
    user,
    setIsAccountDropdownOpen,
    isAccountDropdownOpen,
    closeNotif
}: UserAccountIconProp) {

    const queryClient = useQueryClient();
    const handleLogout = useMutation({
        mutationFn: async () => {
            await logout();
        }, 
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] })
            console.log('logout ok');
        }
    }); 

    return (
        <div className="relative flex items-center gap-[0.5rem]">
            <button onClick={()=>{
                setIsAccountDropdownOpen(open=>!open)
                closeNotif()
            }} className="flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[10px] bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] cursor-pointer transition-all duration-200">
                {user?.profile_url ? (
                    // add the url image from cloudinary or other cloud service provider later
                    <img src="" alt="" />
                ):(
                    <span className="text-[16px] text-[#fff] font-bold leading-none">{user?.name.split('')[0]}</span>
                )}
            </button>

            {isAccountDropdownOpen && (
                <div className="fade-up absolute top-[2.75rem] right-0 bg-[#fff] border border-[#292929]/25 rounded-[5px] min-w-[150px] shadow-lg">
                    <div className="flex flex-col items-start p-[1rem] gap-[0.2rem] border-b border-[#292929]/25">
                        <span className="text-[#292929] text-[16px] font-bold leading-none">{user?.name}</span>
                        <span className="text-[#292929] text-[14px] leading-none opacity-50">{user?.email}</span>
                    </div>

                    <div className="flex flex-col items-start gap-[0.2rem] p-[0.5rem] border-b border-[#292929]/25">
                        <button className="flex items-start justify-start cursor-pointer hover:bg-[#f2f2f2] w-full p-[0.5rem] rounded-[5px]">
                            <span className="text-[14px] text-[#292929] font-bold leading-none">View profile</span>
                        </button>

                        <button onClick={()=>handleLogout.mutate()} className="flex items-start justify-start cursor-pointer hover:bg-[#f2f2f2] w-full p-[0.5rem] rounded-[5px]">
                            <span className="text-[14px] text-[#292929] font-bold leading-none">Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserAccountIcon;