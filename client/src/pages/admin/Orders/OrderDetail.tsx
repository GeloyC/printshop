import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useDownloadOrderFileItem, useGetOrderDetail, useUpdateOrderStatus, useUploadReadyForPickUpImageProof } from "../../../hooks/orders/order.hook";
import type { OrderData, OrderItem, OrderStatusHistoriesType } from "../../../types/order.type";
import StatusDropdown from "../../../components/admin/Order/StatusDropdown";
import { formatDate } from "../../../utils/formatDate";

// icon
import ReferenceIcon from '/src/assets/icon/reference.svg?react';


import OrderFileItem from "./OrderFileItem";
import currencyFormat from "../../../utils/currencyFormat";
import OrderItemConfiguration from "./OrderItemConfiguration";
import OrderPickupProof from "./OrderPickupProof";
import ModalWrapper from "../../../components/wrapper/ModalWrapper";
import ProofImage from "./ProofImage";



function OrderDetail () {

    const { reference_number } = useParams();
    const { data: orderData } = useGetOrderDetail(String(reference_number))
    const order: OrderData = orderData;
    const orderItem: OrderItem[] = order?.order_items
            ?  JSON.parse(order?.order_items)
            : [];
    const orderStatusHistory: OrderStatusHistoriesType[] = order?.order_status_histories
        ? JSON.parse(String(order?.order_status_histories))
        : [];


    const [currentStatus, setCurrentStatus] = useState<string>(order?.status);
    const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);
    const [proofImage, setProofImage] = useState<File|null>(null);
    const [proofImageFilename, setProofImageFilename] = useState<string|null>(null);
    const [proofPreview, setProofPreview] = useState<string|null>(null);
    const [proofModalOpen, setProofModalOpen] = useState<boolean>(false);

    const [proofImageDisplayOpen, setProofImageDisplayOpen] = useState<boolean>(false);

    const { 
        mutate:handleUpdateOrderStatus, 
        isPending:updateStatusPending 
    } = useUpdateOrderStatus(order?.reference_number, currentStatus);


    const [isSelectedFileIdOpen, setIsSelectedFileIdOpen] = useState<string|null>(null);
    const itemDetail = orderItem.find(item => item.id === isSelectedFileIdOpen);
    

    const handleOpenSelectedFile = (file_id: string) => {
        setIsSelectedFileIdOpen(file_id);
    }

    
    const {
        mutateAsync: handleUploadReadyForPickupProofImage,
        isPending: proofImageUploadPending
    } = useUploadReadyForPickUpImageProof(String(reference_number));

    const handleUploadImageProof = async () => {
        try {
            const formData = new FormData;
            if (proofImage) {
                formData.append('file', proofImage)
            }

            await handleUploadReadyForPickupProofImage(formData);
            handleUpdateOrderStatus();

        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 422) {
                    const errors = err.response.data.errors;

                    console.log(errors.file?.[0]);
                } else {
                    console.error(err.response?.data?.message || err.message);
                }
            }
        }
    }

    const { 
        mutate: downloadFile, 
        isPending: downloadPending, 
        variables: downloadingFileId,
    } = useDownloadOrderFileItem()


    const handleDownload = (id: string) => {
        downloadFile(id, {
            onSuccess: () => {
                setDownloadedFiles(prev =>
                    prev.includes(id) ? prev : [...prev, id]
                );
            }
        });
    };



    

    return (
        <div className="flex flex-col w-full h-full bg-[#f2f2f2]">
            <div className="flex items-center justify-between min-h-[3.5rem] p-[0.75rem] px-[1rem] bg-[#fafafa] border-b border-[#292929]/15">
                <span className="text-xl text-[#292929] font-bold">Order details</span>
            </div>

            <div className="flex w-full h-full transition-all duration-200">

                <section className="flex flex-col w-full h-full p-[2rem] gap-[1.5rem]">
                    


                    <div className="flex flex-col w-full gap-[1rem]">
                        <div className="flex items-start justify-between w-full">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-[0.5rem]">
                                    <ReferenceIcon className="size-5 opacity-50" />
                                    <span className="text-4xl text-[#ff6b00] font-bold">{order?.reference_number}</span>
                                </div>

                                <div className="flex items-center gap-[0.5rem]">
                                    <div className="flex items-center">
                                        <span className="text-sm text-[#292929]/80">{`Order placed on ${formatDate(String(order?.created_at))}`}</span>
                                    </div>
                                    <div className="flex items-center gap-[0.5rem]">
                                        <span className="text-sm text-[#292929]/80">by </span>
                                        <span className="text-sm text-[#292929] font-bold">{order?.customer_name}</span>
                                    </div>
                                </div>
                            </div>

                            {order?.rfp_proof_image_url && (
                                <div className="flex flex-col">
                                    <button 
                                        onClick={()=>setProofImageDisplayOpen(true)}
                                        className="cursor-pointer group opacity-75 hover:opacity-100"
                                    >
                                        <span className="text-sm text-[#292929] leading-none border-b border-[#292929]/25 group-hover:border-[#292929]/80 transition-all duration-200">View Ready-for-pickup Image</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <StatusDropdown 
                        status={order?.status}
                        currentStatus={currentStatus}
                        statusHistory={orderStatusHistory}
                        setCurrentStatus={setCurrentStatus}
                        setProofModalOpen={setProofModalOpen}
                        handleUpdateOrderStatus={handleUpdateOrderStatus}
                        updateStatusPending={updateStatusPending}
                    />

                    

                    <div className="flex flex-1 flex-col w-full h-full gap-[0.5rem]">
                        <span className="text-sm text-[#292929] font-bold">File/s</span>

                        <div className="flex w-full">
                            <div className="flex flex-col gap-[1.5rem] w-full h-fit ">

                                <div className="flex flex-col w-full">
                                    <div className="flex flex-col w-full bg-[#fafafa] rounded-[5px] border border-[#292929]/15 overflow-hidden">
                                        <div className="grid grid-cols-[50%_10%_10%_10%_10%_10%] w-full bg-[#292929] p-[1rem] border-b border-[#292929]/15">
                                            <span className="text-sm text-[#fafafa] leading-none">File</span>
                                            <span className="text-sm text-[#fafafa] leading-none">Unit price</span>
                                            <span className="text-sm text-[#fafafa] leading-none">Amount</span>
                                            <span className="text-sm text-[#fafafa] leading-none">Size</span>
                                            <span className="text-sm text-[#fafafa] leading-none">Quantity</ span>
                                            <span className="text-sm text-[#fafafa] leading-none text-center">Action</ span>
                                        </div>

                                        {orderItem.map(item => (
                                            <OrderFileItem key={item.id}
                                                item={item}
                                                handleDownload={handleDownload}
                                                downloadedFiles={downloadedFiles}
                                                downloadPending={downloadPending}
                                                downloadingFileId={downloadingFileId}
                                                isSelectedFileIdOpen={isSelectedFileIdOpen}
                                                handleOpenSelectedFile={handleOpenSelectedFile}
                                                setIsSelectedFileIdOpen={setIsSelectedFileIdOpen}
                                            />
                                        ))}

                                        <div className="grid grid-cols-[50%_10%_10%_10%_10%_10%] p-[1rem] w-full items-center">
                                            <span className="text-sm text-[#292929] leading-none"></span>
                                            <span className="text-sm text-[#292929] leading-none"></span>
                                            <span className="text-sm text-[#ff6b00] font-bold leading-none">{currencyFormat(Number(order?.order_total))}</span>
                                            <span className="text-sm text-[#292929] leading-none"></span> 
                                            <span className="text-sm text-[#292929] leading-none"></ span>
                                            <span className="text-sm text-[#292929] leading-none text-center"></ span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Show the block for sending image of completed print document */}
                {proofModalOpen && order.status !== 'Ready-for-pickup' && (
                    <ModalWrapper>
                        <OrderPickupProof 
                            setProofImage={setProofImage}
                            setProofPreview={setProofPreview}
                            setProofImageFilename={setProofImageFilename}
                            setProofModalOpen={setProofModalOpen}
                            proofImage={proofImage}
                            proofPreview={proofPreview}
                            proofImageFilename={proofImageFilename}
                            setCurrentStatus={setCurrentStatus}
                            handleUploadImageProof={handleUploadImageProof}
                            proofImageUploadPending={proofImageUploadPending}
                        />
                    </ModalWrapper>
                )}

                {proofImageDisplayOpen && (
                    <ModalWrapper>
                        <ProofImage 
                            proof_image_url={String(order?.rfp_proof_image_url)}
                            close={()=>setProofImageDisplayOpen(false)}
                        />
                    </ModalWrapper>
                )}

                {isSelectedFileIdOpen && (
                    <div className="fixed inset-0 flex items-end justify-end w-full h-full z-20">
                        <div onClick={()=>setIsSelectedFileIdOpen(null)} className="absolute inset-0 bg-[#292929]/50"/>
                        <OrderItemConfiguration 
                            isSelectedFileIdOpen={isSelectedFileIdOpen}
                            setIsSelectedFileIdOpen={setIsSelectedFileIdOpen}
                            itemDetail={itemDetail}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderDetail;