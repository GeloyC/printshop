
import { useEffect, type SetStateAction } from "react";


type OrderPickupProofProp = {
    setProofImage: React.Dispatch<SetStateAction<File|null>>,
    setProofImageFilename: React.Dispatch<SetStateAction<string|null>>,
    setProofPreview: React.Dispatch<SetStateAction<string|null>>,
    setProofModalOpen: React.Dispatch<SetStateAction<boolean>>,
    proofImage: File|null,
    proofImageFilename: string|null,
    proofPreview: string|null,
    handleUploadImageProof: () => void,
    proofImageUploadPending: boolean,
    setCurrentStatus: React.Dispatch<SetStateAction<string>>
}

function OrderPickupProof ({
    setProofImage,
    setProofImageFilename,
    setProofPreview,
    setProofModalOpen,
    proofImage,
    proofPreview,
    proofImageFilename,
    handleUploadImageProof,
    proofImageUploadPending,
    setCurrentStatus
}: OrderPickupProofProp) {

    

    const handlePreviewProofImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setProofImageFilename(file.name);
        setProofImage(file);
    }

    useEffect(() => {
        if (!proofImage) {
            setProofPreview('');
            return;
        }

        const previewURL = URL.createObjectURL(proofImage);
        setProofPreview(previewURL)

        return () => URL.revokeObjectURL(previewURL)
    }, [proofImage]);



    return (
        <div className="flex flex-col items-start w-fit gap-[2rem] bg-[#fafafa] rounded-[10px] p-[2rem]">
            <div className="flex flex-col gap-[0.5rem]">
                <span className="text-lg text-[#292929] leadning-none font-bold">Ready-for-pickup Proof</span>
                <span className="text-sm text-[#292929]/75 leading-tight font-bold">Send an image to the customer when all the files are Ready-for-pickup</span>
            </div>

            <div className="flex flex-col items-start w-full bg-[#fafafa] gap-[0.5rem] rounded-[10px]">

                

                <div className={`flex flex-col w-full h-[250px] items-center justify-center bg-[#f2f2f2] rounded-[5px] border border-dashed border-[#292929]/15 overflow-hidden`}>
                    {proofImageUploadPending ? (
                        <span>Loading...</span>
                    ): proofImage ?(
                        <div className="relative flex flex-col w-full h-full">
                            {proofImage && (
                                <button 
                                    onClick={()=>{
                                        setProofImage(null);
                                        setProofImageFilename(null);
                                    }} 
                                    className="absolute top-3 right-3 flex bg-gradient-to-b from-[#292929] via-[#292929] to-[#141414] border border-[#e6e6e6] hover:from-[#404040] active:from-[#292929] p-[0.75rem] rounded-[10px] cursor-pointer"
                                >
                                    <span className="text-sm text-[#fff] font-bold leading-none">Change</span>
                                </button>
                            )}
                            <img src={proofPreview ?? ''} alt="" className="object-contain h-full w-full"/>
                        </div>
                    ):(
                        <>
                            <input 
                                type="file" 
                                id="proof_image" 
                                name="proof_image" 
                                accept=".jpg, .jpeg, .png" hidden
                                onChange={handlePreviewProofImage}
                            />
                            <label 
                                htmlFor="proof_image"
                                className={`
                                    flex items-center jusitfy-center w-fit h-fit px-[1rem] py-[0.5rem] bg-gradient-to-b from-[#404040] via-[#292929] to-[#141414] hover:from-[#404040]/90 active:from-[#404040] rounded-[10px] border border-[#141414] cursor-pointer
                                `}
                            >
                                <span className="text-md text-[#fff]">Select image</span>
                            </label>
                        </>
                    )}
                </div>

                {proofImageFilename && (
                    <span className="text-sm text-[#292929] text-left font-bold leading-none">{proofImageFilename}</span>
                )}

                <div className="flex items-center justify-end w-full gap-[0.3rem] pt-[1rem]">
                    <button 
                        disabled={proofImageUploadPending}
                        onClick={()=>{
                            setProofPreview('');
                            setProofImage(null);
                            setProofImageFilename(null);
                            setProofModalOpen(false);
                        }}
                        className={`flex p-[0.75rem] rounded-[10px] ${proofImageUploadPending ? 'opacity-25' : 'hover:bg-[#e6e6e6] active:bg-transparent cursor-pointer'}`}
                    >
                        <span className="text-sm text-[#292929] leading-none">Cancel</span>
                    </button>
                    <button 
                        onClick={()=>{
                            setCurrentStatus('Ready-for-pickup');
                            handleUploadImageProof();
                        }}
                        disabled={!proofImage || proofImageUploadPending}
                        className={`flex  bg-[#ff6b00] p-[0.75rem] rounded-[10px] ${proofImage || proofImageUploadPending ? 'opacity-100 hover:bg-[#cc4c02] active:bg-[#ff6b00] cursor-pointer' : 'opacity-50'}`}
                    >
                        <span className="text-sm text-[#fafafa] leading-none">Update status and save</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderPickupProof;