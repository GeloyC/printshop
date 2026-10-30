import { Link } from 'react-router-dom';


// icon
import Folder from '/src/assets/icon/folder.svg?react'

type FolderButtonProp = {
    closeDropdowns: ()=>void
}

function FolderButton ({closeDropdowns}:FolderButtonProp) {


    return (
        <div onClick={closeDropdowns} className='relative'>
            <Link to="/folder" className={`relative flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-[#fff] active:bg-[#f2f2f2] rounded-[10px] cursor-pointer transition-all duration-100`}>
                <div className="flex items-center gap-[0.3rem]">
                    <Folder className="size-6 opacity-80" />
                    {/* <span className="text-[14px] text-[#292929] font-bold leading-none">Folder</span> */}
                </div>

                <div className='absolute -top-1 -left-1 h-[1.2rem] w-[1.2rem] flex items-center justify-center bg-[#ff6b00] border-2 border-[#fff] rounded-full'>
                    <span className='text-[#fff] text-[12px] font-bold leading-none'>0</span>
                </div>
            </Link>
        </div>
    )
}

export default FolderButton;