
import { useEffect, useState, type SetStateAction } from 'react';

// icons
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'
import ImageIcon from '/src/assets/icon/image-icon.svg?react'
import CheckboxType from '../../ui/ConfigurationType/CheckboxType';

// components
import ConfigItemWrapper from '../../wrapper/ConfigItemWrapper';
import RadioType from '../../ui/ConfigurationType/RadioType';
import DropdownType from '../../ui/ConfigurationType/DropdownType';
import TextType from '../../ui/ConfigurationType/TextType';

import type { CartItemType, fileConfigType, fileItem, SelectedOption, UpdatedConfigPayload } from '../../../types/file.type';
import { useUpdateCartItemConfiguration } from '../../../hooks/cart/order_item.hook';
import { useUserContext } from '../../../context/userContext';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';





interface ModalProp {
    closeModal: () => void;
    selectedItem?: CartItemType,
    configurations: fileConfigType|undefined
}

export type SelectedOptions = Record<string, SelectedOption[]>;

function ConfigurationSetupModalCart ({
    closeModal,
    selectedItem,
    configurations
}: ModalProp) {

    const { user } = useUserContext();
    const [quantity, setQuantity] = useState<number>(selectedItem?.quantity ?? 1);
    const [additionalInstruction, setAdditionalInstruction] = useState<string>(selectedItem?.additional_instruction ?? '');


    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => {
        const savedOptions = selectedItem?.configuration ?? [];

        return savedOptions.reduce<SelectedOptions>((acc, option) => {
            const config = configurations?.configuration.find(config =>
                config.options.some(opt => opt.id === option.id)
            );

            if (!config) return acc;

            acc[config.id] = [
                ...(acc[config.id] ?? []),
                option
            ];

            return acc;
        }, {});
    });

    const updatedConfiguration = Object.values(selectedOptions).flat();
    const { mutate: updateCartItemConfiguration, isPending: isUpdateLoading } = 
        useUpdateCartItemConfiguration(
            String(selectedItem?.id), 
            user.id
        );

    const configUpdated = JSON.stringify(updatedConfiguration) !== JSON.stringify(selectedItem?.configuration ?? []);
    const instructionUpdated = additionalInstruction !== selectedItem?.additional_instruction;
    const quantityUpdated = quantity !== selectedItem?.quantity;

    const hasChanges = configUpdated || instructionUpdated || quantityUpdated;

    const handleUpdateConfiguration = () => {
        if (!hasChanges) return;

        const payload: Partial<UpdatedConfigPayload> = {};

        if (configUpdated) payload.configuration = updatedConfiguration;
        if (instructionUpdated) payload.additional_instruction = additionalInstruction;
        if (quantityUpdated) payload.quantity = quantity;

        updateCartItemConfiguration(payload, {
            onSuccess: () => closeModal()
        });
    }


    return (
        <div className="fade-up flex flex-col items-center w-[600px] bg-[#FFF] p-[2rem] gap-[1rem] rounded-[15px]">
            <span className='text-3xl text-[#292929] font-bold leading-none'>File setup</span>

            <div className='flex flex-col w-full '>
                <span className='text-[14px] font-bold text-[#575757]'>File</span>
                <div className='flex items-center gap-[0.5rem] w-full p-[1rem]  bg-[#fff0d3] rounded-[5px]'>

                    {
                        selectedItem?.metadata?.file_type === 'application/pdf' 
                            ? <PDFIcon className="size-6 shrink-0" color="#F40F02"/> 
                            : selectedItem?.metadata?.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
                                ? <DOCXIcon className="size-6 shrink-0" color="#1B5EBE"/>
                                : selectedItem?.metadata?.file_type === 'image/png' 
                                    ? <ImageIcon className='size-6 shrink-0' />
                                    : <ImageIcon className='size-6 shrink-0' />
                    }
                    <span className="text-[16px] text-[#292929] font-bold leading-none w-[500px] truncate">{selectedItem?.metadata?.file_name}</span>
                </div>
            </div>


            <div className="flex flex-col w-full gap-[1rem]">
                {configurations?.configuration.map(config => 
                    <div key={config.id}>  
                        {config.type === 'checkbox' ? (
                            <ConfigItemWrapper configLabel={config.label} configType={config.type}>
                                {config.options.map(opt => (
                                    <CheckboxType 
                                        key={opt.id}
                                        id={opt.id}
                                        labelKey={config.key}
                                        option={opt.option}
                                        price={opt.price}
                                        selected={selectedOptions[config.id]?.some(
                                            item => item.id === opt.id 
                                        ) ?? false}
                                        onSelect={() => {
                                            setSelectedOptions(prev => {
                                                const currentOptions = prev[config.id] ?? [];
                                                const isSelected = currentOptions.some(
                                                    item => item.id === opt.id
                                                );

                                                return {
                                                    ...prev,
                                                    [config.id]: isSelected
                                                        ? currentOptions.filter(item => item.id !== opt.id)
                                                        : [
                                                            ...currentOptions,
                                                            {
                                                                id: opt.id,
                                                                category: config.label,
                                                                option: opt.option,
                                                                price: opt.price
                                                            }
                                                        ]
                                                };
                                            });
                                        }}
                                    />
                                ))}
                            </ConfigItemWrapper>
                        ) : config.type === 'radio' ? (
                            <ConfigItemWrapper configLabel={config.label} configType={config.type}>
                                {config.options.map(opt => (
                                    <RadioType 
                                        key={opt.id}
                                        id={opt.id}
                                        labelKey={config.key}
                                        option={opt.option}
                                        price={opt.price}
                                        selected={selectedOptions[config.id]?.some(
                                            item => item.id === opt.id 
                                        ) ?? false}
                                        onSelect={() => {
                                            setSelectedOptions(prev => ({
                                                ...prev,
                                                [config.id]: [{
                                                    id: opt.id,
                                                    category: config.label,
                                                    option: opt.option,
                                                    price: opt.price
                                                }]
                                            }))
                                        }}
                                    />
                                ))}
                            </ConfigItemWrapper>
                        ) : config.type === 'select' && (
                            <ConfigItemWrapper configLabel={config.label} configType={config.type}>
                                <DropdownType
                                    options={config.options}
                                    config={config}
                                    selectedOptions={selectedOptions}
                                    setSelectedOptions={setSelectedOptions}
                                />
                            </ConfigItemWrapper>
                        )}
                    </div>
                )}

                <TextType 
                    additionalInstruction={additionalInstruction}
                    setAdditionalInstruction={setAdditionalInstruction}
                />

                
                <div className="flex flex-col w-full gap-[0.3rem] pb-[0.5rem] z-10">
                    <span className='text-[14px] font-bold text-[#575757]'>Quantity (how many copies)</span>

                    <div className="flex items-center w-full gap-[0.3rem]">
                        <button onClick={()=>setQuantity(count=> --count)} disabled={quantity === 1} className={`p-[0.5rem] px-[1rem] rounded-[5px] bg-[#e6e6e6] ${quantity > 1 ? 'active:bg-[#a5a5a5] cursor-pointer' : 'cursor-not-allowed' }  transition-all duration-100`}>-</button>
                        <input type="text" value={quantity} disabled name="" id="" className='text-center max-w-[50px] border-2 border-[#575757] rounded-[10px] focus:outline-none focus:border-[#ff810a] p-[0.5rem] text-[#272727] font-bold'/>
                        <button onClick={()=>setQuantity(count=> ++count)} className='p-[0.5rem] px-[1rem] rounded-[5px] bg-[#e6e6e6] active:bg-[#a5a5a5] cursor-pointer transition-all duration-100'>+</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end w-full gap-[0.3rem] z-20">
                <button onClick={closeModal} className="p-[0.5rem] bg-[#f2f2f2] hover:bg-[#d6d6d6] active:bg-[#e6e6e6] rounded-[5px] cursor-pointer">
                    <span className="text-[#272727] px-[1rem]">Cancel</span>
                </button>

                <button 
                    onClick={handleUpdateConfiguration}
                    disabled={!hasChanges}
                    className={`p-[0.5rem] bg-[#272727] rounded-[5px]  ${hasChanges ? 'hover:bg-[#1a1a1a] active:bg-[#434343] cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                >
                    {isUpdateLoading ? (
                        <div className='flex items-center gap-[0.5rem] px-[1rem]'>
                            <span className='text-[#fff]'>Saving</span>
                            <LoadingSpinner size={15} color='#FFFFFF'/>
                        </div>
                    ):(
                        <span className="text-[#FFF] px-[1rem]">Save</span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default ConfigurationSetupModalCart