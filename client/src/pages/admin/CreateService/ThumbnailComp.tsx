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

        return () => URL.revokeObjectURL(previewURL)
    }, [thumbnailBlob]);



    return (
        <div className="flex flex-col w-full gap-[1rem]">

            <div className='flex flex-col'>
                <span className="text-[16px] font-bold">Thumbnail</span>
                <span className="text-[14px] opacity-75">Add a short description here. State why thumbnail is important</span>
            </div>

            <div className={`relative flex items-center justify-center w-full rounded-[10px] ${thumbnailPrev ? 'h-[325px]' : 'h-[325px]'} gap-1 bg-[#fafafa] border border-dashed border-[#292929]/50 overflow-hidden`}>

                <input type="file" name="thumbnail" id="thumbnail" 
                    onChange={handleReadThumbnail}
                    accept=".png, .jpg, .jpeg" 
                    hidden
                />

                {thumbnailPrev ? (
                    <div className='group relative flex w-full h-full'>
                        <button onClick={()=>setThumbnailPrev('')} 
                            className='absolute bottom-4 left-4 opacity-25 group-hover:opacity-100 bg-gradient-to-b from-[#ff6b00] via-[#cc4c02] to-[#9a3902] hover:from-[#ffc36d] active:from-[#cc4c02] border border-[#9a3902] rounded-[10px] p-[0.2rem] px-[0.75rem] transition-all duration-100 cursor-pointer z-10'
                        >
                            <span className='text-[14px] text-[#fff] font-bold leading-none'>Change</span>
                        </button>
                        
                        <div className='absolute inset-0 bg-transparent group-hover:bg-[#292929]/25' />

                        <img 
                            src={thumbnailPrev} 
                            alt="thumbnail preview" 
                            className={`object-contain w-full h-full`}
                        />
                    </div>
                ):(
                    <div className='flex flex-col items-center gap-1 w-full'>
                        <Upload className='size-20 p-[0.5rem] opacity-75' color='#292929'/>
                        <div className='flex flex-col items-center gap-1'>
                            <label htmlFor="thumbnail"
                            className='flex items-center bg-gradient-to-b from-[#ff6b00] via-[#cc4c02] to-[#9a3902] hover:from-[#ffc36d] active:from-[#cc4c02] border border-[#9a3902] rounded-[10px] p-[0.75rem] gap-[0.5rem] cursor-pointer transition-all duration-200'>
                                <span className='text-sm text-[#fff] leading-none opacity-75 px-[0.5rem]'>Upload file</span>
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