import { useFileContext } from "../context/documentPrintContext";

// icons
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'
import Check from '/src/assets/icon/check.svg?react'
import Document from '/src/assets/icon/document.svg?react'


function DocumentPrintSetup () {
    const { files } = useFileContext();

    console.log('file content: ', files);

    return (
        <div className="flex flex-col w-full h-full items-center pt-[2rem]">

            <span className="text-[28px] font-bold text-[#272727] leading-none">Setup your files</span>

            <div className="flex flex-col w-full h-full items-center justify-between py-[2rem]">
                <div className="flex flex-col items-center gap-[0.5rem] w-full">
                    {files.map((f, index) => (
                        <div key={index} className="group flex items-center justify-between bg-[#fff0d3] w-[600px] hover:w-[620px] p-[1rem] rounded-[5px] transition-all duration-100">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-[0.5rem]">
                                    <Document className="size-5" color="#a13c0b"/>
                                    <span className="text-[#a13c0b] text-[16px] font-bold cursor-default">{f.filename}</span>
                                </div>
                                <button className="flex items-center cursor-pointer bg-transparent group-hover:bg-[#ffdca5]/50 hover:bg-[#ffdca5] active:bg-[#ffdca5]/50 rounded-full">
                                    <span className="opacity-0 group-hover:opacity-100 text-[14px] text-[#a13c0b] font-bold pl-[1rem]">Settings</span>
                                    <Arrow className="size-7 rotate-180 p-1" color="#a13c0b" />
                                </button>
                            </div>


                        </div>
                    ))}

                    <div className="group flex items-center justify-between bg-[#8AFF8A] w-[600px] hover:w-[620px] p-[1rem] rounded-[5px] transition-all duration-100">
                        <div className="flex items-center gap-[0.5rem]">
                            <Check className="size-5" />
                            <span className="text-[#272727] text-[16px] font-bold cursor-default">All goods</span>
                        </div>
                        <button className="flex items-center cursor-pointer bg-transparent group-hover:bg-[#33f534]/50 hover:bg-[#33f534] active:bg-[#33f534]/50 rounded-full">
                            <span className="opacity-0 group-hover:opacity-100 text-[14px] text-[#272727] font-bold pl-[1rem]">Settings</span>
                            <Arrow className="size-7 rotate-180 p-1" color="#272727" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full">
                    <button className="bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#82330c] w-[600px] py-[0.5rem] cursor-pointer rounded-[10px]">
                        <span className="text-[#FFF]">Proceed</span> 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DocumentPrintSetup;