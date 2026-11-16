
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

        setSelectedStatus(selectedStatus);
        setCurrentStatus(selectedStatus);
        handleUpdateOrderStatus();
    }



    return (
        <div className="flex flex-col w-full h-auto gap-[0.5rem]">
            <span className="text-sm text-[#292929] font-bold">Status</span>

            <div className="flex items-center justify-center w-full h-full p-[0.75rem] pl-[0.75rem] gap-[0.3rem] bg-[#fafafa] rounded-[10px] border border-[#292929]/15">
                {statuses.map((item, index) => {

                    const Icon = item.icon;
                    const passed = index <= currentStatusIndex;

                    const history = statusHistory.find(
                        history => history.status === item.name
                    );

                    const updatedAt = history
                        ? formatDate(String(history.updated_at))
                        : 'Pending';
                    
                    return (
                        <div 
                            key={item.name} 
                            className={`relative flex flex-col items-center justify-center w-full h-full pl-[0.5rem]`}
                        >
                            {/* <div className={`flex w-full h-[3px] rounded-full ${passed ? 'bg-[#498d49]' : 'bg-[#B1B2B5]'}`} /> */}
                            {/* <div className={`absolute -top-[6px] -left-2 border-4 ${passed ? 'border-[#498d49]' : 'border-[#292929]'} bg-[#fafafa] w-[1rem] h-[1rem] rounded-full`} /> */}

                            <div className={`absolute top-1/2 -translate-y-1/2 -left-[12px] flex items-center justify-center rounded-full min-w-[1.5rem] min-h-[1.5rem] border-4 border-[#fafafa] ${passed ? 'bg-[#498d49]/90' : 'bg-[#292929]'}`}>
                                {passed 
                                    ? <Passed className="size-5" color="#fff" />
                                    : <Icon className="size-5" color="#fff" />
                                }
                            </div>

                            <button 
                                onClick={()=>handleSetStatus(item.name)}
                                disabled={passed || updateStatusPending}
                                className={`
                                    flex w-full min-h-[56px] h-[56px] p-[0.5rem] pl-[1rem] gap-[0.3rem] rounded-[8px]
                                    ${updateStatusPending && selectedStatus === item.name ? 'items-start justify-start' : 'items-center justify-center'}
                                    ${passed ? 'bg-[#498d49]/90 cursor-not-allowed' : 'bg-[#292929] hover:bg-[#141414] active:bg-[#292929] cursor-pointer'} 
                                `}
                            >
                                {updateStatusPending && selectedStatus === item.name
                                    ? <LoadingSpinner size={15} color="#fff" />
                                    : (
                                        <div className="flex flex-col w-full items-start">
                                            <span className={`text-sm text-[#fafafa] font-bold`}>{item.name}</span>
                                            <span className={`text-sm text-[#fafafa]`}>{updatedAt}</span>
                                        </div>
                                    )
                                }
                            </button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default StatusDropdown;