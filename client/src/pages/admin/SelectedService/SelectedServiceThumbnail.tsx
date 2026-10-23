
import { useState } from 'react';

// icons
import ImageIcon from '/src/assets/icon/image.svg?react'

import { ThumbnailUrl } from '../../../utils/cloudflarePublicURL';
import type { SetStateAction } from 'react';

type SelectedServiceThumbnailProp = {
    currentImage: string
    isEditing: boolean
    setNewThumbnail: React.Dispatch<SetStateAction<File|null>>
    setThumbnailPreview: React.Dispatch<SetStateAction<string>>
}

function SelectedServiceThumbnail ({
    currentImage,
    isEditing,
    setNewThumbnail,
    setThumbnailPreview
}: SelectedServiceThumbnailProp) {

    const [newImagePrev, setNewImagePrev] = useState<string>('');

    const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {

            const file = e.target.files?.[0];
            if (!file) return;

            const preview = URL.createObjectURL(file);
            console.log(preview);

            setNewImagePrev(preview);
            setThumbnailPreview(preview)

            setNewThumbnail(file);
            
        } catch (err) {
            console.error('error viewing image: ', err);
        }
    }



    return (
        <section className="flex flex-col w-[700px] p-[1rem] gap-[1rem]">
            <div className='flex flex-col'>
                <span className="text-[16px] font-bold">Thumbnail</span>
                <span className="text-[14px] opacity-75">Add a short description here. State why thumbnail is important</span>
            </div>
            
            {!newImagePrev ? (
                <div className="flex items-center justify-center overflow-hidden h-[200px] bg-[#fff0d3] p-[0.5rem] rounded-[5px] border-2 border-dashed border-[#ffdca5]">
                    <img src={`${ThumbnailUrl}${currentImage}`} alt="" className={`object-contain w-full h-full`} />
                </div>
            ):(
                <div className="flex items-center justify-center overflow-hidden h-[200px] bg-[#fff0d3] p-[0.5rem] rounded-[5px] border-2 border-dashed border-[#ffdca5]">
                    <img src={`${newImagePrev}`} alt="" className={`object-contain w-full h-full`} />
                </div>
            )}

            {isEditing && (
                <>
                    <input type="file" id="service_thumbnail" 
                        accept={'.png, .jpeg, .jpg'} 
                        hidden 
                        onChange={handlePreviewImage}
                    />
                    <label htmlFor='service_thumbnail' 
                    className="flex items-center justify-center py-[0.5rem] gap-[0.3rem] w-full bg-[#292929] hover:bg-[#292929]/90 active:bg-[#292929] rounded-[5px] transition-all duration-100 cursor-pointer">
                        <ImageIcon className="size-5" color="#fff"/>
                        <span className="text-[14px] text-[#fff]">Replace image</span>
                    </label>
                </>
            )}
        </section>
    )
}

export default SelectedServiceThumbnail;