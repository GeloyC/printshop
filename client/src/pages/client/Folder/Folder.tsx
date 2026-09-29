
// components
import FolderItem from "./FolderItem"

function Folder () {

    return (
        <div className="flex flex-col w-full h-full gap-[2rem] py-[1rem]">
            <span className="text-[24px] text-[#292929] font-bold leading-none">My Folder</span>

            
            <div className="flex items-center justify-start w-full">
                <button className={`group flex items-center justify-center py-[0.5rem] px-[1rem] min-w-[100px] bg-[#fff0d3] rounded-[5px] cursor-pointer`}>
                    <span className={`text-[16px] text-[#ff6b00] group-hover:text-[#ff6b00] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>All</span>
                </button>

                <button className={`group flex items-center justify-center py-[0.5rem] px-[1rem] min-w-[100px] bg-[#fff] rounded-[5px] cursor-pointer`}>
                    <span className={`text-[16px] text-[#292929] group-hover:text-[#ff6b00] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>To Print</span>
                </button>

                <button className={`group flex items-center justify-center py-[0.5rem] px-[1rem] min-w-[100px] bg-[#fff] rounded-[5px] cursor-pointer`}>
                    <span className={`text-[16px] text-[#292929] group-hover:text-[#ff6b00] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>To Pickup</span>
                </button>

                <button className={`group flex items-center justify-center py-[0.5rem] px-[1rem] min-w-[100px] bg-[#fff] rounded-[5px] cursor-pointer`}>
                    <span className={`text-[16px] text-[#292929] group-hover:text-[#ff6b00] group-active:text-[#cc4c02] font-bold transition-all duration-100`}>Completed</span>
                </button>
            </div>


            <div className="flex flex-col w-full h-full">
                
                {/* Item block */}
                <FolderItem />
                <FolderItem />
            </div>
        </div>
    )
}

export default Folder