import Add from '/src/assets/icon/add.svg?react'

type FunctionType = {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DocumentPrintUpload ({ handleFileChange }: FunctionType) {

    return (
        <div className="flex flex-col items-center justify-center w-[700px] p-[2rem] bg-[#ff6b00]/15 gap-[2rem] rounded-[30px] border-2 border-dashed border-[#ff6b00]/25">
            <input type="file" name="document_upload" id="document_upload" multiple onChange={handleFileChange} hidden/>
            <div className='flex flex-col items-center w-full gap-[0.5rem]'>
                <label htmlFor="document_upload" className="flex items-center justify-center w-full gap-[0.5rem] group bg-[#FFF] px-[2rem] py-[1rem] cursor-pointer rounded-[15px] shadow-lg active:shadow-sm bg-[#ff6b00] hover:bg-[#ff810a] active:bg-[#ff6b00] transition-all duration-100">
                    <Add className='size-5' color='#FFF'/>
                    <span className='font-[500] text-[#FFF]'>Upload files</span>
                </label>
                <span className='text-[14px] opacity-75'>Upload up to 10 files max</span>
            </div>
        </div>
    )
}

export default DocumentPrintUpload  