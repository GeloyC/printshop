
import { useState, type SetStateAction } from "react";

// icons
import ArrowDown from '/src/assets/icon/arrow-no-tail.svg?react'
import type { UseMutateFunction } from "@tanstack/react-query";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

type StatusDropdownProp = {
    status: string
    currentStatus: string,
    setCurrentStatus: React.Dispatch<SetStateAction<string>>
    handleUpdateOrderStatus: UseMutateFunction,
    updateStatusPending: boolean
}

function StatusDropdown ({
    status,
    currentStatus,
    setCurrentStatus,
    handleUpdateOrderStatus,
    updateStatusPending
}: StatusDropdownProp) {

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleSetStatus = (status: string) => {
        setCurrentStatus(status);
        setDropdownOpen(false);

        handleUpdateOrderStatus();
    }



    return (
        <div className="flex items-center gap-[0.5rem]">
            <span className="text-sm text-[#292929]/80">Status:</span>
            
            <div className="relative flex items-center w-[200px] rounded-[10px] border border-[#9a3902]/50 border-t-[#ffc36d] border-x-[#ff6b00] bg-gradient-to-b from-[#ff6b00] to-[#cc4c02]">
                {
                    updateStatusPending 
                        ? (
                            <div className="flex items-center justify-center w-full">
                                <LoadingSpinner size={15} color="#ffffff" />
                            </div>
                        ) : (
                            <span className="text-sm text-[#fff] px-[0.75rem] w-full">{currentStatus ?? status}</span>
                        )
                }
                

                <button onClick={()=>setDropdownOpen(open => !open)} className="flex items-center justify-center p-[0.5rem] bg-gradient-to-b from-[#ff6b00] to-[#cc4c02] hover:from-[#ffc36d]/50 active:from-[#ff6b00] rounded-r-[10px] border-l border-[#9a3902]/50 cursor-pointer">
                    <ArrowDown className="size-5 rotate-270" color="#fff" />
                </button>

                {dropdownOpen && (
                    <div className="absolute top-10 right-0 flex flex-col w-[200px] bg-gradient-to-b from-[#ff6b00] via-[#ff6b00] to-[#cc4c02] border border-[#9a3902]/50 border-t-[#ffc36d] border-x-[#ff6b00] rounded-[10px] p-[0.5rem]">
                        <button 
                            onClick={()=>handleSetStatus('Order placed')}
                            className="flex items-center p-[0.5rem] hover:bg-[#9a3902]/30 active:bg-transparent rounded-[5px] cursor-pointer"
                        >
                            <span className="text-sm text-[#fff]">Order placed</span>
                        </button>

                        <button 
                            onClick={()=>handleSetStatus('Order confirmed')}
                            className="flex items-center p-[0.5rem] hover:bg-[#9a3902]/30 active:bg-transparent rounded-[5px] cursor-pointer"
                        >
                            <span className="text-sm text-[#fff]">Order confirmed</span>
                        </button>

                        <button 
                            onClick={()=>handleSetStatus('Processing')}
                            className="flex items-center p-[0.5rem] hover:bg-[#9a3902]/30 active:bg-transparent rounded-[5px] cursor-pointer"
                        >
                            <span className="text-sm text-[#fff]">Processing</span>
                        </button>

                        <button 
                            onClick={()=>handleSetStatus('Ready-for-pickup')}
                            className="flex items-center p-[0.5rem] hover:bg-[#9a3902]/25 active:bg-transparent rounded-[5px] cursor-pointer"
                        >
                            <span className="text-sm text-[#fff]">Ready-for-pickup</span>
                        </button>

                        <button 
                            onClick={()=>handleSetStatus('Completed')}
                            className="flex items-center p-[0.5rem] hover:bg-[#9a3902]/25 active:bg-transparent rounded-[5px] cursor-pointer"
                        >
                            <span className="text-sm text-[#fff]">Completed</span>
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default StatusDropdown;