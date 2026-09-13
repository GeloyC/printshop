
// icons
import ImageIcon from '/src/assets/icon/image.svg?react'


function SelectedServiceThumbnail () {

    return (
        <section className="flex flex-col w-[700px] p-[1rem] gap-[1rem]">
            <div className='flex flex-col'>
                <span className="text-[16px] font-bold">Thumbnail</span>
                <span className="text-[14px] opacity-75">Add a short description here. State why thumbnail is important</span>
            </div>
            
            <div className="flex items-center justify-center h-[200px] bg-[#B1B2B5]">
                Image here
            </div>

            <button className="flex items-center justify-center py-[0.5rem] gap-[0.3rem] w-full bg-[#292929] hover:bg-[#292929]/90 active:bg-[#292929] transition-all duration-100 cursor-pointer">
                <ImageIcon className="size-5" color="#fff"/>
                <span className="text-[14px] text-[#fff]">Replace image</span>
            </button>
        </section>
    )
}

export default SelectedServiceThumbnail;