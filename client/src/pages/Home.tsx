import Add from '/src/assets/icon/add.svg?react'

function Home () {

    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-[2rem] px-[16rem]">
            
            <div className='flex flex-col items-center w-full gap-[2rem]'>
                <span className='text-[14px] text-[#ff6b00] font-bold bg-[#ff6b00]/15 rounded-[15px] px-[1rem] py-[0.5rem]'>DOCUMENT PRINT</span>
                <h1 className='text-7xl text-[#272727] text-center font-[900] leading-none'>Send your files now,<br/> pick them up later</h1>
                <span className='text-[18px] text-[#272727] font-bold'>We will handle the printing, you just chill and wait</span>
            </div>

            <div className="flex flex-col items-center justify-center w-[700px] p-[2rem] bg-[#ff6b00]/15 gap-[2rem] rounded-[30px] border-2 border-dashed border-[#ff6b00]/25">
                <input type="file" name="document_upload" id="document_upload" hidden/>

                <div className='flex flex-col items-center w-full gap-[0.5rem]'>
                    <label htmlFor="document_upload" className="flex items-center justify-center w-full gap-[0.5rem] group bg-[#FFF] px-[2rem] py-[1rem] cursor-pointer rounded-[15px] shadow-lg active:shadow-sm bg-[#ff6b00] hover:bg-[#ff6b00]/75 active:bg-[#ff6b00]/25 transition-all duration-100">
                        <Add className='size-5' color='#FFF'/>
                        <span className='font-[500] text-[#FFF]'>Upload files</span>
                    </label>
                    <span className='text-[14px] opacity-75'>Upload up to 10 files max</span>
                </div>

            </div>

            <div className='flex flex-col items-center w-full gap-[0.5rem]'>
                <span className='text-[18px] font-bold'>How it works</span>

                <div className='grid grid-cols-4 w-full gap-[0.5rem]'>
                    <div className='relative flex flex-col items-center w-full bg-[#fff] rounded-[20px] p-[1rem] pt-[2rem] shadow-lg'>
                        <span className='absolute -top-4 px-[0.75rem] py-[0.5rem] rounded-full bg-[#272727] text-[#FFF] border-4 border-[#FFF] leading-none'>1</span>
                        <span className='text-[18x] font-bold'>Upload your file/s</span>
                        <span className='text-center text-[14px] leading-tight'>To get started, upload up to 10 files that you want to be printed.</span>
                    </div>

                    <div className='relative flex flex-col items-center w-full bg-[#fff] rounded-[20px] p-[1rem] pt-[2rem] shadow-lg'>
                        <span className='absolute -top-4 px-[0.75rem] py-[0.5rem] rounded-full bg-[#272727] text-[#FFF] border-4 border-[#FFF] leading-none'>2</span>
                        <span className='text-[18x] font-bold'>Setup the file/s</span>
                        <span className='text-center text-[14px] leading-tight'>Set the variation (colored/black & White), document size, quantity, etc. to make sure that your files are printed correctly.</span>
                    </div>

                    <div className='relative flex flex-col items-center w-full bg-[#fff] rounded-[20px] p-[1rem] pt-[2rem] shadow-lg'>
                        <span className='absolute -top-4 px-[0.75rem] py-[0.5rem] rounded-full bg-[#272727] text-[#FFF] border-4 border-[#FFF] leading-none'>3</span>
                        <span className='text-[18x] font-bold'>Send & Wait</span>
                        <span className='text-center text-[14px] leading-tight'>If the setup is ready, the files will proceed to the printing queue. You will be notified when it's done.</span>
                    </div>

                    <div className='relative flex flex-col items-center w-full bg-[#fff] rounded-[20px] p-[1rem] pt-[2rem] shadow-lg'>
                        <span className='absolute -top-4 px-[0.75rem] py-[0.5rem] rounded-full bg-[#272727] text-[#FFF] border-4 border-[#FFF] leading-none'>4</span>
                        <span className='text-[18x] font-bold'>Pick-up your file/s</span>
                        <span className='text-center text-[14px] leading-tight'>To get started, upload up to 10 files that you want to be printed.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home