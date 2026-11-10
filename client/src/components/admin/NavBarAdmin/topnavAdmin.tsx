import { useState } from 'react'

// icons
import Logo from '/src/assets/icon/mock-logo.svg?react' // remove this later


// component
import AdminUserIcon from './AdminUserIcon'

function TopNavAdmin () {

    const [dropdown, setDropdown] = useState<boolean>(false);


    return (
        <div className="flex items-center justify-between w-full min-h-[3rem] z-10 p-[0.3rem] px-[1rem] ">
            <div className={`flex items-center h-[3rem] max-h-[3rem] gap-[0.5rem]`}>
                {/* <Logo className="h-[20px] w-[30px]" /> */}
                <span className="font-bold text-2xl text-[#cc4c02] leading-none">Admin PrintShop</span>
            </div>

            <AdminUserIcon 
                dropdown={dropdown}
                setDropdown={setDropdown}
            />
        </div>
    )
}

export default TopNavAdmin