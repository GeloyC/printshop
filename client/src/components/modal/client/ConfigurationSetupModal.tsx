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

import type { fileItem, fileConfigType, SelectedOption } from '../../../types/FileType';

/* 
SelectedOption = {
    id: string,
    category: string,
    option: string,
    price: number
}
*/

/*
fileItem = {
    id: string,
    file: File,
    quantity: number
    slug: string,
    configuration?: fileConfigType
}
*/

type SelectedOptions = Record<string, SelectedOption[]>;

interface ModalProp {
    selectedFile: fileItem | null
    setFiles: React.Dispatch<SetStateAction<fileItem[]>>
    setSelectedFile: React.Dispatch<SetStateAction<fileItem|null>>
    closeModal: () => void;
    configurations: fileConfigType,
    setFileSetupModalOpen: React.Dispatch<SetStateAction<boolean>>
}

function ConfigurationSetupModal ({ 
    selectedFile,
    setFiles,
    setSelectedFile,
    closeModal,
    configurations,
    setFileSetupModalOpen
}: ModalProp ) {

    const [quantity, setQuantity] = useState<number>(selectedFile?.quantity ?? 1);
    const [additionalInstruction, setAdditionalInstruction] = useState<string>(selectedFile?.additional_instruction ?? '');
    // const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => {
        const savedOptions = selectedFile?.configuration ?? [];

        return savedOptions.reduce<SelectedOptions>((acc, option) => {
            const config = configurations.configuration.find((config: any) =>
                config.options.some((opt: any) => opt.id === option.id)
            );

            if (!config) return acc;

            acc[config.id] = [...(acc[config.id] ?? []), option];

            return acc;
        }, {});
    });
    

    const handleSaveFileConfiguration = (
        quantity: number,
        configuration: SelectedOptions,
        additionalInstruction?: string 
    ) => {
        if (!selectedFile) return;

        const formattedConfiguration = Object.values(configuration).flat();

        const updatedFile: fileItem = {
            ...selectedFile,
            quantity,
            configuration: formattedConfiguration,
            additional_instruction: additionalInstruction
        };

        // Update the currently selected file
        setSelectedFile(updatedFile);

        // Update the same file in the uploaded files array
        setFiles(prev =>
            prev.map(file =>
                file.id === updatedFile.id ? updatedFile : file
            )
        );

        setFileSetupModalOpen(false);
    };


    return (
        <div className="fade-up flex flex-col items-center w-[600px] bg-[#FFF] p-[2rem] gap-[1rem] rounded-[5px]">
            <span className='text-3xl text-[#292929] font-bold leading-none'>File setup</span>

            <div className='flex flex-col w-full '>
                <span className='text-[14px] font-bold text-[#575757]'>File</span>
                <div className='flex items-center gap-[0.5rem] w-full p-[1rem]  bg-[#fff0d3] rounded-[5px]'>

                    {
                        selectedFile?.file?.type === 'application/pdf' ? <PDFIcon className="size-6 shrink-0" color="#F40F02"/> 
                        : selectedFile?.file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? <DOCXIcon className="size-6 shrink-0" color="#1B5EBE"/>
                        : selectedFile?.file?.type === 'image/png' ? <ImageIcon className='size-6 shrink-0' />
                        : <ImageIcon className='size-6 shrink-0' />
                    }
                    <span className="text-[16px] text-[#292929] font-bold leading-none w-[500px] truncate">{selectedFile?.file?.name}</span>
                </div>
            </div>


            <div className="flex flex-col w-full gap-[1rem]">
                {configurations.configuration.map(config => (
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
                                                )
                                                
                                                return ({
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
                                            })})
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
                                />
                            </ConfigItemWrapper>
                        )}
                    </div>
                ))}

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
                <button onClick={
                    () => handleSaveFileConfiguration(
                        quantity, 
                        selectedOptions, 
                        additionalInstruction
                    )
                } 
                className="p-[0.5rem] bg-[#272727] hover:bg-[#1a1a1a] active:bg-[#434343] rounded-[5px] cursor-pointer">
                    <span className="text-[#FFF] px-[1rem]">Save</span>
                </button>
            </div>
        </div>
    )
}

export default ConfigurationSetupModal