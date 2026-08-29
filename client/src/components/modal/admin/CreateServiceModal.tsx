import { useState } from "react";


interface ModalProp {
    close: () => void;
}

function CreateServiceModal ({
    close 
}: ModalProp) {

    const [isStatusSelected, setIsStatusSelected] = useState<string>('active');

    const [isOptionFieldOpen, setIsOptionFieldOpen] = useState<boolean>(false);

    const [newOption, setNewOption] = useState<string>('')
    const [options, setOptions] = useState<string[]>([]);

    const handleAddOptions = (value: string) => {
        setOptions(option => [...option, value]);
        setNewOption('');
        setIsOptionFieldOpen(false);
    }

    return (
        <div className='fade-up flex flex-col w-[1000px] bg-[#fff] rounded-[15px] p-[2rem] gap-[1.5rem]'>
            <span className="text-[24px] font-bold text-[#292929]">Create Service</span>

            <div className="flex flex-col w-full gap-[1rem] h-[550px] overflow-y-auto thin-scrollbar">
                
                <div className="flex flex-col w-full gap-[0.5rem]">
                    <span className="text-[14px] font-bold text-[#292929]">Name</span>
                    <input type="text" name="" id="" className="text-[16px] font-bold p-[0.5rem] w-full border border-[#292929] rounded-[5px]"/>
                </div>  

                <div className="flex flex-col w-full gap-[0.5rem]">
                    <span className="text-[14px] font-bold text-[#292929]">Description</span>
                    <textarea name="" id="" rows={3} className="p-[0.5rem] font-bold border border-[#292929] rounded-[5px]"></textarea>
                </div>  

                <div className="flex flex-col w-full gap-[0.5rem]">
                    <span className="text-[14px] font-bold text-[#292929]">Base Price (Php)</span>
                    <input type="text" name="" id="" className="text-[16px] font-bold p-[0.5rem] w-full border border-[#292929] rounded-[5px]"/>
                </div>  

                {/* insert fields for configuration */}
                <div className="flex flex-col w-full border border-dashed border-[#ff6b00] p-[1rem] rounded-[15px]">
                    <span className="text-[14px] font-bold text-[#ff6b00] text-center">Configuration</span>

                    <div className="flex flex-col items-center w-full gap-[0.5rem] p-[0.75rem] border border-dashed border-[#ff6b00] bg-[#ffdca5] rounded-[10px]">
                        <div className="grid grid-cols-3 w-full gap-[0.5rem]">
                            <div className="flex flex-col w-full">
                                <span className="text-[14px] font-bold">Key</span>
                                <input type="text" name="key" id="service_key" className="p-[0.5rem] text-[#292929] font-bold border border-[#292929] bg-[#fff] rounded-[5px]"/>
                            </div>

                            <div className="flex flex-col w-full">
                                <span className="text-[14px] font-bold">Label</span>
                                <input type="text" name="key" id="service_key" className="p-[0.5rem] text-[#292929] font-bold border border-[#292929] bg-[#fff] rounded-[5px]"/>
                            </div>

                            <div className="flex flex-col w-full">
                                <span className="text-[14px] font-bold">Type</span>
                                <input type="text" name="key" id="service_key" className="p-[0.5rem] text-[#292929] font-bold border border-[#292929] bg-[#fff] rounded-[5px]"/>
                            </div>
                        </div>

                        <div className="flex flex-col w-full border border-dashed border-[#cc4c02] p-[0.5rem] gap-[0.5rem] rounded-[5px]">
                            <div className="flex items-center gap-[0.5rem]">
                                <span className="text-[14px] font-bold">Options</span>
                                <button onClick={()=>setIsOptionFieldOpen(true)} className="bg-[#ff6b00] active:bg-[#cc4c02] py-[0.2rem] rounded-[5px] cursor-pointer transition-all duration-100">
                                    <span className="text-[14px] text-[#fff] px-[0.5rem] font-bold leading-none">+ Add</span>
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-[0.2rem] w-full">
                                {options.map(opt => (
                                    <span className="bg-[#fff] text-[14px] font-bold p-[0.3rem] px-[0.5rem] rounded-[5px] border border-[#292929]/75">{opt}</span>
                                ))}

                                {isOptionFieldOpen && (
                                    <div className="flex items-center gap-[0.3rem]">
                                        <input type="text" name="option" id="option_new" value={newOption} onChange={(e)=>setNewOption(e.target.value)}
                                        className="bg-[#fff] text-[14px] font-bold p-[0.3rem] rounded-[5px] border border-[#292929]/75"/>
                                        <button onClick={()=>handleAddOptions(newOption)} className="bg-[#292929] border border-[#292929] rounded-[5px] text-[#fff] text-[14px] p-[0.5rem] leading-none">Save</button>
                                        <button onClick={()=>setIsOptionFieldOpen(false)} className="bg-[#404040] border border-[#292929] rounded-[5px] text-[#fff] text-[14px] p-[0.5rem] leading-none">Cancel</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex items-center w-full gap-[0.5rem]">
                    <span className="text-[14px] font-bold text-[#292929]">Select status</span>
                    <div className="flex items-center p-[0.3rem] bg-[#B1B2B5]/25 rounded-[10px]">
                        <input type="radio" name="status" id="status_active" checked={isStatusSelected === 'active'} value={'active'} onChange={(e)=>setIsStatusSelected(e.target.value)} hidden/>
                        <input type="radio" name="status" id="status_inactive" checked={isStatusSelected === 'inactive'} value={'inactive'} onChange={(e)=>setIsStatusSelected(e.target.value)} hidden/>

                        <label htmlFor="status_active" className={`cursor-pointer py-[0.3rem] px-[0.5rem] ${isStatusSelected === 'active' && 'bg-[#32CD32] text-[#fff]'} font-bold rounded-[5px]`}>Active</label>
                        <label htmlFor="status_inactive" className={`cursor-pointer py-[0.3rem] px-[0.5rem] ${isStatusSelected === 'inactive' && 'bg-[#6D8196] text-[#fff]'} font-bold rounded-[5px]`}>Inactive</label>
                    </div>
                </div>  
                
            </div>

            <div className="flex items-center justify-end w-full gap-[0.3rem]">
                <button className="font-bold text-[#fff] p-[0.5rem] rounded-[10px] px-[1rem] bg-[#ff6b00] cursor-pointer">Create</button>
                <button onClick={close} className="font-bold p-[0.5rem] rounded-[10px] px-[1rem] bg-[#B1B2B5]/25 cursor-pointer">Cancel</button>
            </div>
        </div>
    )
}

export default CreateServiceModal;