import { Link } from 'react-router-dom';


// icon
import Folder from '/src/assets/icon/folder.svg?react'


function FolderButton () {


    return (
        <div className='relative'>
            <Link to="/folder" className={`relative flex p-[0.5rem] border border-[#f2f2f2] bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-[#f2f2f2] rounded-full cursor-pointer transition-all duration-100`}>
                <Folder className="size-5" />

                <div className='absolute -top-2 -left-2 h-[1.2rem] w-[1.2rem] flex items-center justify-center bg-[#ff6b00] rounded-full'>
                    <span className='text-[#fff] text-[12px] font-bold leading-none'>9+</span>
                </div>
            </Link>
        </div>
    )
}

export default FolderButton;