import type { fileItem } from "../../../types/file.type"
import currencyFormat from "../../../utils/currencyFormat"

// icon
import Check from '/src/assets/icon/check.svg?react'


type OptionProp = {
    id: string,
    selectedFileId: string
    option: string,
    price: number
    onSelect: () => void,
    selected: boolean
    labelKey: string
}

function RadioType ({ id, selectedFileId, option, price, onSelect, selected, labelKey }: OptionProp) {

    const isDisabled = !selectedFileId;
    console.log(isDisabled)

    return (
        <div 
            className={`group flex w-fit rounded-[10px] overflow-hidden z-20 min-w-[100px] 
                ${selected
                    ? 'bg-[#292929]'
                    : isDisabled
                        ? 'bg-[#f2f2f2]'
                        : 'bg-[#f2f2f2] hover:bg-[#e6e6e6] active:bg-[#f2f2f2]'
                }
            `} 
        >

            <div className={`group flex w-fit z-20 min-w-[100px]`}>

                <input 
                    type="radio" 
                    name={labelKey} 
                    id={id} hidden 
                    disabled={isDisabled}
                    onChange={() => {
                        onSelect();
                    }}
                />

                {selectedFileId 
                    ? (
                        <label htmlFor={id}
                            className={`flex flex-col items-start justify-between w-full gap-[1rem] p-[0.75rem] cursor-pointer`}
                        >
                            <div className="flex gap-[0.5rem]">
                                {selected 
                                    ? <Check className="size-4" color="#fff" />
                                    : <div
                                        className={`
                                            size-4 border-2 p-[0.2rem] rounded-full
                                            ${selected
                                                ? 'border-2 border-[#fafafa] bg-[#fafafa]'
                                                : 'border-2 border-[#292929]/50'
                                            }
                                        `}
                                    />     
                                }
                                

                                

                                <span className={`text-[14px] ${selected && !isDisabled ? 'text-[#fafafa]' : 'text-[#292929]'} text-wrap font-bold leading-none`}>{option}</span>
                            </div>

                            <span className={`text-[14px] ${selected ? 'text-[#fafafa]' : 'text-[#292929]'} text-wrap leading-none`}>{currencyFormat(price)}</span>
                        </label>
                    ):(
                        <label htmlFor={id}
                            className={`flex flex-col items-start justify-between w-full gap-[1rem] p-[0.75rem]`}
                        >
                            <div className="flex gap-[0.5rem]">
                                <div className={`w-3 h-2 border-2 p-[0.3rem] rounded-full border-[#292929]/50`} />
                                <span className={`text-[14px] text-[#292929] text-wrap font-bold leading-none`}>{option}</span>
                            </div>

                            <span className={`text-[14px] ${selected ? 'text-[#ff6b00]' : 'text-[#292929]'} text-wrap leading-none opacity-50`}>{currencyFormat(price)}</span>
                        </label>
                    )
                }
            </div>
        </div>
    )
}

export default RadioType