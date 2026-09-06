// icon
import Upload from '/src/assets/icon/upload.svg?react'


function ThumbnailComp () {

    return (
        <div className="flex flex-col w-[700px] gap-[1rem]">

            <div className='flex flex-col'>
                <span className="text-[16px] font-bold">Thumbnail</span>
                <span className="text-[14px] opacity-75">Add a short description here. State why thumbnail is important</span>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-[200px] gap-1 bg-[#fff0d3] border-2 border-dashed border-[#ffdca5]">

                <Upload className='size-20 p-[0.5rem] opacity-75' color='#292929'/>
                
                <input type="file" name="thumbnail" id="thumbnail" 
                accept="image/png, image/jpg image/jpeg"
                hidden
                />

                <div className='flex flex-col items-center gap-1'>
                    <label htmlFor="thumbnail"
                    className='flex flex-col items-center justify-center cursor-pointer bg-[#fff] p-[0.5rem] rounded-[5px]'>
                        <span className='text-[14px] font-bold leading-none opacity-75 px-[0.5rem]'>Upload file</span>
                    </label>

                    <span className='text-[14px] opacity-75'>Add a short instructions here</span>
                </div>
            </div>

        </div>
    )
}

export default ThumbnailComp;