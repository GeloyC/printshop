import { useState } from 'react'

// component
import AdminUserIcon from './AdminUserIcon'

function TopNavAdmin () {

    const [dropdown, setDropdown] = useState<boolean>(false);


    return (
        <div className="sticky top-0 grid grid-cols-[15%_85%] flex-1 w-full h-[3.5rem] max-h-[3.5rem] z-10 bg-[#fafafa] border-b border-[#292929]/15">
            <div className={`flex items-center justify-center h-full w-full p-[0.5rem] gap-[0.5rem] border-r border-[#292929]/15`}>
                <span className="font-bold text-lg text-[#292929] leading-none">Admin PrintShop</span> 
            </div>

            <div className='flex items-center justify-end w-full h-full px-[1rem]'>
                <AdminUserIcon 
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                />
            </div>
        </div>
    )
}

export default TopNavAdmin