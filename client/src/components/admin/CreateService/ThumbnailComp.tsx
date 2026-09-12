// icon
import { useEffect, type SetStateAction } from 'react';
import Upload from '/src/assets/icon/upload.svg?react'

interface ThumbnailCompProp {
    thumbnailPrev: string
    thumbnailBlob: File | null
    setThumbnailBlob: React.Dispatch<SetStateAction<File|null>>
    setThumbnailPrev: React.Dispatch<SetStateAction<string>>
}

function ThumbnailComp ({ 
    thumbnailPrev,
    thumbnailBlob,
    setThumbnailBlob, 
    setThumbnailPrev 
}: ThumbnailCompProp) {

    const handleReadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (!file) return;

        setThumbnailBlob(file);
    }

    useEffect(() => {
        if (!thumbnailBlob) {
            setThumbnailPrev('');
            return;
        }

        const previewURL = URL.createObjectURL(thumbnailBlob);
        setThumbnailPrev(previewURL)

        console.log(previewURL);
        return () => URL.revokeObjectURL(previewURL)
    }, [thumbnailBlob]);



    return (
        <div className="flex flex-col w-[700px] gap-[1rem]">

            <div className='flex flex-col'>
                <span className="text-[16px] font-bold">Thumbnail</span>
                <span className="text-[14px] opacity-75">Add a short description here. State why thumbnail is important</span>
            </div>

            <div className={`relative flex items-center justify-center w-full ${thumbnailPrev ? 'h-[250px] ' : 'h-[200px] '} gap-1 bg-[#fff0d3] p-[0.5rem] border-2 border-dashed border-[#ffdca5]`}>

                <input type="file" name="thumbnail" id="thumbnail" 
                onChange={handleReadThumbnail}
                accept="image/png, image/jpg image/jpeg"
                hidden
                />

                {thumbnailPrev ? (
                    <div className='group relative flex h-full'>
                        <button onClick={()=>setThumbnailPrev('')} className='opacity-0 group-hover:opacity-100 bg-[#fff] active:bg-[#B1B2B5] p-[0.2rem] px-[0.75rem]
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100 cursor-pointer z-10'>
                            <span className='text-[14px] font-bold leading-none'>Change</span>
                        </button>
                        
                        <div className='absolute inset-0 bg-transparent group-hover:bg-[#292929]/50' />

                        <img src={thumbnailPrev} alt="thumbnail preview" 
                        className={`object-contain w-full h-full`}
                        />
                    </div>
                ):(
                    <div className='flex flex-col items-center gap-1 w-full'>
                        <Upload className='size-20 p-[0.5rem] opacity-75' color='#292929'/>
                        <div className='flex flex-col items-center gap-1'>
                            <label htmlFor="thumbnail"
                            className='flex flex-col items-center justify-center cursor-pointer bg-[#fff] p-[0.5rem] rounded-[5px]'>
                                <span className='text-[14px] font-bold leading-none opacity-75 px-[0.5rem]'>Upload file</span>
                            </label>

                            <span className='text-[14px] opacity-75'>Add a short instructions here</span>
                        </div>
                    </div>
                )}
            </div>
            
            

        </div>
    )
}

export default ThumbnailComp;