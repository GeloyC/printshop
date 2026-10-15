
// icons
import ImageIcon from '/src/assets/icon/image.svg?react'

import { ThumbnailUrl } from '../../../utils/cloudflarePublicURL';

type SelectedServiceThumbnailProp = {
    currentImage: string
}

function SelectedServiceThumbnail ({
    currentImage
}: SelectedServiceThumbnailProp) {



    return (
        <section className="flex flex-col w-[700px] p-[1rem] gap-[1rem]">
            <div className='flex flex-col'>
                <span className="text-[16px] font-bold">Thumbnail</span>
                <span className="text-[14px] opacity-75">Add a short description here. State why thumbnail is important</span>
            </div>
            
            <div className="flex items-center justify-center overflow-hidden h-[200px] bg-[#fff0d3] p-[0.5rem] rounded-[5px] border-2 border-dashed border-[#ffdca5]">
                <img src={`${ThumbnailUrl}${currentImage}`} alt="" className={`object-contain w-full h-full`} />
            </div>

            <button className="flex items-center justify-center py-[0.5rem] gap-[0.3rem] w-full bg-[#292929] hover:bg-[#292929]/90 active:bg-[#292929] rounded-[5px] transition-all duration-100 cursor-pointer">
                <ImageIcon className="size-5" color="#fff"/>
                <span className="text-[14px] text-[#fff]">Replace image</span>
            </button>
        </section>
    )
}

export default SelectedServiceThumbnail;