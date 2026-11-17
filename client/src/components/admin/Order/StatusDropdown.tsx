
import { useState, type SetStateAction } from "react";

// icons
import ArrowDown from '/src/assets/icon/arrow-no-tail.svg?react';
import PendingIcon from '/src/assets/icon/pending.svg?react';
import Passed from '/src/assets/icon/check.svg?react';

import type { UseMutateFunction } from "@tanstack/react-query";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import type { OrderStatusHistoriesType } from "../../../types/order.type";
import { formatDate } from "../../../utils/formatDate";

type StatusDropdownProp = {
    status: string
    currentStatus: string,
    statusHistory: OrderStatusHistoriesType[];
    setCurrentStatus: React.Dispatch<SetStateAction<string>>
    setProofModalOpen: React.Dispatch<SetStateAction<boolean>>,
    handleUpdateOrderStatus: UseMutateFunction
    updateStatusPending: boolean
}

function StatusDropdown ({
    status,
    currentStatus,
    statusHistory,
    setCurrentStatus,
    setProofModalOpen,
    handleUpdateOrderStatus,
    updateStatusPending
}: StatusDropdownProp) {

    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const statuses = [
        { name: 'Order placed', icon: PendingIcon },
        { name: 'Order confirmed', icon: PendingIcon },
        { name: 'Processing', icon: PendingIcon },
        { name: 'Ready-for-pickup', icon: PendingIcon },
        { name: 'Completed', icon: PendingIcon }
    ];

    const currentStatusIndex = statuses.findIndex(
        item => item.name === status
    );


    const handleSetStatus = (selectedStatus: string) => {
        if (selectedStatus === 'Ready-for-pickup') {
            setProofModalOpen(true);    
            return;
        } 

        setProofModalOpen(false);    
        setSelectedStatus(selectedStatus);
        setCurrentStatus(selectedStatus);
        handleUpdateOrderStatus();
    }



    return (
        <div className="flex flex-col w-full h-auto gap-[0.5rem]">

            <div className="flex items-center justify-center w-full h-full">
                {statuses.map((item, index) => {

                    const Icon = item.icon;
                    const passed = index < currentStatusIndex;
                    const notPassed = index > currentStatusIndex+1; // the status beside the next status of the current status
                    const current = index === currentStatusIndex;

                    console.log('passed: ', passed);

                    const history = statusHistory.find(
                        history => history.status === item.name
                    );

                    const updatedAt = history
                        ? formatDate(String(history.updated_at))
                        : '...';
                    
                    return (
                        <button 
                            onClick={()=>handleSetStatus(item.name)}
                            disabled={current || passed || notPassed || updateStatusPending}
                            className={`
                                group flex w-full gap-[0.5rem] items-start p-[0.75rem] border-y border-[#292929]/50
                                ${passed
                                    ? 'bg-[#fafafa] border-r border-dashed border-[#292929] opacity-50' 
                                    : current
                                        ? 'bg-[#292929] border-solid'
                                        : notPassed
                                            ? 'bg-[#f2f2f2] border-l border-dashed border-[#292929] opacity-50'
                                            : 'bg-[#B1B2B5]/80 hover:bg-[#404040]/50 active:bg-[#B1B2B5] border-dashed cursor-pointer transition-all duration-200'
                                }
                            `}
                        >
                            <div className={`flex items-center justify-center rounded-full
                                ${passed 
                                    ? 'bg-[#292929]' 
                                    : current 
                                        ? 'bg-[#fafafa]'
                                        : notPassed
                                            ? 'bg-[#fafafa]'
                                            : 'bg-[#fafafa]' 

                                }`}>
                                {passed
                                    ? <Passed className="size-5" color="#fff" />
                                    : current 
                                        ? <Passed className="size-5" color="#292929" />
                                        : updateStatusPending && !notPassed
                                            ? <LoadingSpinner size={20} color="#292929" />
                                            : <Icon className="size-5" color="#404040" />
                                }
                            </div>
                            
                            <div className="flex flex-col w-full items-start">
                                <span 
                                    className={`
                                        text-md leading-none
                                        ${passed 
                                            ? 'text-[#292929] font-bold' 
                                            : current
                                                ? 'text-[#fafafa] font-bold'
                                                : notPassed
                                                    ? 'text-[#404040] font-bold'
                                                    : 'text-[#404040] font-bold group-hover:text-[#292929] transition-all duration-200' // next
                                        }
                                    `}
                                >{item.name}</span>
                                <span 
                                    className={`
                                        text-sm 
                                        ${passed 
                                            ? 'text-[#292929]' 
                                            : current
                                                ? 'text-[#fafafa]'
                                                : notPassed
                                                    ? 'text-[#404040]'
                                                    : 'text-[#404040] group-hover:text-[#141414] transition-all duration-200' // next
                                        }
                                    `}
                                >{updatedAt}</span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default StatusDropdown;