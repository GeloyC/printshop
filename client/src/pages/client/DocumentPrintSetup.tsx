import { useState } from "react";


// context
import { useFileContext } from "../../context/documentPrintContext";

// icons
import Arrow from '/src/assets/icon/arrow-no-tail.svg?react'
import Check from '/src/assets/icon/check.svg?react'
import Document from '/src/assets/icon/document.svg?react'

// wrapper
import ModalWrapper from "../../components/wrapper/ModalWrapper";

// modal
import DocumentPrintFileSetupModal from "../../components/modal/client/DocumentPrintFileSetupModal";



function DocumentPrintSetup () {
    const { files } = useFileContext();

    const [modal, setModal] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<string|null>(null);

    const handleFileSetup = ( filename: string) => {
        try {
            setModal(open=>!open);
            setSelectedFile(filename);
        } catch (err) {
            throw err;
        }
    }

    return (
        <>
            <div className="flex flex-col w-full h-full items-center py-[2rem] px-[16rem] gap-[2rem]">

                <div className="grid grid-cols-4 w-[600px] justify-even gap-[0.3rem]">
                    <div className="load-progress  w-full h-[5px] bg-[#09de0a] rounded-full" />
                    <div className="w-full h-[5px] bg-[#a3a3a3] rounded-full opacity-50" />
                    <div className="w-full h-[5px] bg-[#a3a3a3] rounded-full opacity-50" />
                    <div className="w-full h-[5px] bg-[#a3a3a3] rounded-full opacity-50" />
                </div>

                <span className="text-[28px] font-bold text-[#272727] leading-none">Setup your files</span>

                <div className="flex flex-col w-full h-full items-center justify-between">
                    <div className="flex flex-col items-center gap-[0.5rem] w-full">
                        {files.map((f, index) => (
                            <div key={index} className="group flex items-center justify-between bg-[#fff0d3] w-[600px] hover:w-[620px] p-[1rem] rounded-[5px] transition-all duration-100">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-[0.5rem]">
                                        <Document className="size-5" color="#a13c0b"/>
                                        <span className="text-[#a13c0b] text-[16px] font-bold cursor-default">{f.filename}</span>
                                    </div>
                                    <button onClick={()=>handleFileSetup(f.filename)} className="flex items-center cursor-pointer bg-transparent group-hover:bg-[#ffdca5]/50 hover:bg-[#ffdca5] active:bg-[#ffdca5]/50 rounded-full">
                                        <span className="opacity-0 group-hover:opacity-100 text-[14px] text-[#a13c0b] font-bold pl-[1rem]">Settings</span>
                                        <Arrow className="size-7 rotate-180 p-1" color="#a13c0b" />
                                    </button>
                                </div>


                            </div>
                        ))}

                        <div className="group flex items-center justify-between bg-[#8AFF8A] w-[600px] hover:w-[620px] p-[1rem] rounded-[5px] transition-all duration-100">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-[0.5rem]">
                                    <Check className="size-5" />
                                    <span className="text-[#272727] text-[16px] font-bold cursor-default">All goods</span>
                                </div>
                                <button className="flex items-center cursor-pointer bg-transparent group-hover:bg-[#33f534]/50 hover:bg-[#33f534] active:bg-[#33f534]/50 rounded-full">
                                    <span className="opacity-0 group-hover:opacity-100 text-[14px] text-[#272727] font-bold pl-[1rem]">Edit</span>
                                    <Arrow className="size-7 rotate-180 p-1" color="#272727" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full gap-[0.3rem]">
                        <button className="bg-[#B1B2B5]/25 hover:bg-[#B1B2B5]/50 active:bg-[#B1B2B5] w-[600px] py-[1rem] cursor-pointer rounded-[10px]">
                            <span className="text-[#272727] font-[600]">Add file/s</span> 
                        </button>

                        <button className="bg-[#141414] hover:bg-[#272727] active:bg-[#0b0b0b] w-[600px] py-[1rem] cursor-pointer rounded-[10px]">
                            <span className="text-[#FFF]">Proceed</span> 
                        </button>
                    </div>
                </div>
            </div>


            {modal && (
                <ModalWrapper>
                    <DocumentPrintFileSetupModal 
                        selectedFile={selectedFile}
                        closeModal={()=>setModal(open=>!open)}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

export default DocumentPrintSetup;