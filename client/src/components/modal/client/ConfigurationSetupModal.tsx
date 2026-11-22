import { useEffect, useState, type SetStateAction } from 'react';

// icons
import PDFIcon from '/src/assets/icon/pdf-icon.svg?react'
import DOCXIcon from '/src/assets/icon/word-icon.svg?react'
import ImageIcon from '/src/assets/icon/image-icon.svg?react'
import ExclamationMark from '/src/assets/icon/exclamation-mark.svg?react'
import ServiceIcon from '/src/assets/icon/service.svg?react'

import CheckboxType from '../../ui/ConfigurationType/CheckboxType';

// components
import ConfigItemWrapper from '../../wrapper/ConfigItemWrapper';
import RadioType from '../../ui/ConfigurationType/RadioType';
import DropdownType from '../../ui/ConfigurationType/DropdownType';
import TextType from '../../ui/ConfigurationType/TextType';

import type { 
    fileItem, 
    fileConfigType, 
    SelectedOptions 
} from '../../../types/file.type';
import type { ServiceType } from '../../../types/service/service.type';




interface ModalProp {
    service: ServiceType,
    selectedFile: fileItem | null
    setFiles: React.Dispatch<SetStateAction<fileItem[]>>
    setSelectedFile: React.Dispatch<SetStateAction<fileItem|null>>
    closeModal: () => void;
    configurations?: fileConfigType
}

function ConfigurationSetupModal ({ 
    service,
    selectedFile,
    setFiles,
    setSelectedFile,
    closeModal,
    configurations,
}: ModalProp ) {


    const [quantity, setQuantity] = useState<number>(selectedFile?.quantity ?? 1);
    const [additionalInstruction, setAdditionalInstruction] = useState<string>(selectedFile?.additional_instruction ?? '');

    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => {
        const savedOptions = selectedFile?.configuration ?? [];

        return savedOptions.reduce<SelectedOptions>((acc, option) => {
            const config = configurations?.configuration.find((config: any) =>
                config.options.some((opt: any) => opt.id === option.id)
            );

            if (!config) return acc;

            acc[config.id] = [...(acc[config.id] ?? []), option];

            return acc;
        }, {});
    });



    // const isConfigurationComplete = Object.values(selectedOptions)?.length === configurations?.configuration?.length;
    const isConfigurationComplete = configurations?.configuration?.every(
        config => (selectedOptions[config.id]?.length ?? 0) > 0
    ) ?? false;

    const handleSaveFileConfiguration = (
        quantity: number,
        configuration: SelectedOptions,
        additionalInstruction?: string,
    ) => {
        if (!selectedFile || !isConfigurationComplete) return;

        const formattedConfiguration = Object.values(configuration).flat();
        const totalPricePerItem = formattedConfiguration.reduce((acc, config) => acc + config.price, 0);


        const updatedFile: fileItem = {
            ...selectedFile,
            quantity,
            configuration: formattedConfiguration,
            additional_instruction: additionalInstruction,
            unit_price: totalPricePerItem,
            total_price: totalPricePerItem * quantity
        };

        // Update the currently selected file
        setSelectedFile(updatedFile);

        // Update the same file in the uploaded files array
        setFiles(prev =>
            prev.map(file =>
                file.id === updatedFile.id ? updatedFile : file
            )
        );
        
        setSelectedFile(null);
    };

    useEffect(() => {
        console.log('selected file: ', selectedFile);
    }, [selectedFile]);


    return (
        <div className='flex flex-col w-full gap-[1rem]'>
            <div className={`flex flex-col items-start w-full h-full overflow-hidden rounded-t-[10px]`}>
                
                
                {/* <div className='flex flex-col w-full '>
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
                </div> */}

                <div className={`relative flex flex-col w-full gap-[1rem] p-[2rem] bg-gradient-to-b from-[#ff6b00] to-[#ffc16b] border-b-2 border-dashed border-[#ffc16b]`}>
                    <div className="absolute top-0 left-0 bg-[#fff8ec] size-8 rounded-br-[50px]" />
                    <div className="absolute top-0 right-0 bg-[#fff8ec] size-8 rounded-bl-[50px]" />
                        

                    <div className='flex items-center gap-[0.5rem]'>
                        <ServiceIcon className="size-6" color='#292929' />
                        <span className='text-xl text-[#292929] font-bold leading-none'>{service.name}</span>
                    </div>
                    <p className='text-md text-[#292929] leading-tight'>{service.description}</p>
                </div>

                

                <div 
                    className={`relative flex flex-col w-full gap-[1rem] p-[2rem] bg-gradient-to-b from-[#ffc16b] to-[#ffdca3] rounded-b-[10px] ${selectedFile ? 'opacity-100' : 'opacity-75'}`}
                >
                    
                    
                    <div className="absolute bottom-0 left-0 bg-[#fff8ec] size-8 rounded-tr-[50px]" />
                    <div className="absolute bottom-0 right-0 bg-[#fff8ec] size-8 rounded-tl-[50px]" />

                    <span className='text-xl text-[#292929] font-bold leading-none'>Specification</span>

                    <div className='flex items-center w-full gap-[0.5rem] opacity-75'>
                        <ExclamationMark className="size-5 bg-[#292929] p-[0.2rem] rounded-full" color="#fafafa" />
                        <p className='text-sm text-[#292929] font-bold leading-none'>
                            Select from each specification below according to how you want your files printed
                        </p>
                    </div>

                    <div className='flex flex-col items-start w-full gap-[0.3rem]'>
                        <span className='text-sm text-[#292929] font-bold'>File</span>
                        {selectedFile 
                            ? <span className='text-sm text-[#292929] font-bold bg-[#fff0d3] p-[1rem] w-full rounded-[5px]'>{selectedFile?.file.name}</span>
                            : <span className='text-sm text-[#292929]/50 font-bold bg-[#fff0d3] p-[1rem] w-full rounded-[5px]'>No file selected</span>
                        }
                        
                    </div>

                    {configurations?.configuration?.map(config => (
                        <div key={config.id}>  
                            {config.type === 'checkbox' ? (
                                <ConfigItemWrapper configLabel={config.label} configType={config.type}>
                                    {config.options.map(opt => (
                                        <CheckboxType 
                                            key={opt.id}
                                            id={opt.id}
                                            selectedFileId={selectedFile?.id ?? ''}
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
                                            selectedFileId={selectedFile?.id ?? ''}
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
                    ))}

                    <TextType
                        selectedFileId={selectedFile?.id ?? ''} 
                        additionalInstruction={additionalInstruction}
                        setAdditionalInstruction={setAdditionalInstruction}
                    />

                    
                    <div className="flex flex-col w-full gap-[0.3rem] z-10">
                        <span className='text-[14px] font-bold text-[#292929]'>Quantity (how many copies)</span>

                        <div className="flex items-center w-full gap-[0.3rem]">
                            <button onClick={()=>setQuantity(count=> --count)} disabled={quantity === 1 && !selectedFile?.id} className={`p-[0.5rem] px-[1rem] rounded-[5px] bg-[#fafafa] ${quantity > 1 ? 'active:bg-[#a5a5a5] cursor-pointer' : 'cursor-not-allowed' }  transition-all duration-100`}>-</button>
                            <input type="text" value={quantity} disabled name="" id="" className='text-center max-w-[50px] border-2 border-[#575757] rounded-[10px] focus:outline-none focus:border-[#ff810a] p-[0.5rem] text-[#272727] font-bold'/>
                            <button onClick={()=>setQuantity(count=> ++count)} disabled={!selectedFile?.id} className={`p-[0.5rem] px-[1rem] rounded-[5px] bg-[#fafafa] ${selectedFile?.id ? 'active:bg-[#a5a5a5] cursor-pointer' : 'cursor-not-allowed'} transition-all duration-100`}>+</button>
                        </div>
                    </div>


                </div>

                {selectedFile && (
                    <div className="flex items-center justify-end w-full gap-[0.3rem] z-20 pt-[0.5rem]">
                        <button 
                            disabled={!isConfigurationComplete}
                            onClick={
                                () => handleSaveFileConfiguration(
                                    quantity, 
                                    selectedOptions, 
                                    additionalInstruction
                                )
                            } 
                            className={`flex justify-center w-full py-[0.75rem] bg-[#292929] rounded-[10px] ${isConfigurationComplete ? 'hover:bg-[#141414] active:bg-[#292929] cursor-pointer' : 'opacity-80 cursor-not-allowed'}`}
                        >
                            <span className="text-[#FFF] font-bold">Save configuration</span>
                        </button>

                        <button
                            onClick={()=>setSelectedFile(null)} 
                            className={`flex justify-center w-full py-[0.75rem] rounded-[10px] bg-transparent hover:bg-[#e6e6e6] active:bg-transparent cursor-pointer`}
                        >
                            <span className="text-[#292929] font-bold">Cancel</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConfigurationSetupModal