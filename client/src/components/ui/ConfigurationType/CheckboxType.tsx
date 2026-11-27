import currencyFormat from "../../../utils/currencyFormat"

// icon
import Check from '/src/assets/icon/check.svg?react'

type OptionProp = {
    id: string,
    selectedFileId: string
    option: string,
    price: number,
    onSelect: () => void,
    selected: boolean
    labelKey: string
}

function CheckboxType ({ id, selectedFileId, option, price, onSelect, selected, labelKey }: OptionProp) {

    const isDisabled = !selectedFileId;
    console.log(isDisabled);

    return (
        <div 
            className={`group flex w-fit rounded-[10px] overflow-hidden z-20 min-w-[100px] 
                ${selected
                    ? 'bg-[#292929]'
                    : isDisabled
                        ? 'bg-[#B1B2B5]'
                        : 'bg-[#B1B2B5]/50 hover:bg-[#e6e6e6] active:bg-[#f2f2f2]'
                }
            `} 
        >
            <input 
                type="checkbox" 
                name={labelKey} 
                id={id} 
                hidden 
                onChange={onSelect}
                disabled={isDisabled}
            />

            <div className="group flex w-fit z-20 min-w-[100px]">
                {selectedFileId 
                    ? (
                        <label 
                            htmlFor={id}
                            className={`flex flex-col items-start justify-between w-full gap-[1rem] p-[0.75rem] cursor-pointer`}
                        >
                            <div className="flex items-center gap-[0.5rem]">

                                {selected 
                                    ? <Check className="size-4" color="#fff" />
                                    : <div 
                                        className={`w-3 h-2 border-2 p-[0.3rem] rounded-[3px] border-[#292929]/50 group-hover:border-[#292929]/75 group-active:border-[#292929]/50 bg-[#fafafa]`} 
                                    />     
                                }
                                
                                <span className={`text-[14px] ${selected && !isDisabled ? 'text-[#fafafa]' : 'text-[#292929]'} text-wrap font-bold leading-none`}>{option}</span>
                            </div>

                            <span className={`text-[14px] text-[#ff6b00] text-wrap font-bold leading-none`}>{currencyFormat(price)}</span>
                        </label>
                    ):(
                        <label htmlFor={id}
                            className={`flex flex-col items-start justify-between w-full gap-[1rem] p-[0.75rem]`}
                        >
                            <div className="flex items-center gap-[0.5rem]">
                                <div className={`w-3 h-2 border-2 p-[0.3rem] rounded-[3px] border-[#292929]/50`} />     
                                <span className={`text-[14px] text-[#292929] text-wrap font-bold leading-none`}>{option}</span>
                            </div>
                            <span className={`text-[14px] text-[#ff6b00] text-wrap font-bold leading-none`}>{currencyFormat(price)}</span>
                        </label>
                    )
                }

            </div>
        </div>
    )
}

export default CheckboxType