import type { SetStateAction } from "react"
import currencyFormat from "../../../utils/currencyFormat"

type SelectedOption = {
    id: string,
    option: string,
    price: number
}

type OptionProp = {
    id: string,
    option: string,
    price: number,
    onSelect: () => void,
    selected: boolean
    labelKey: string
}

function CheckboxType ({ id, option, price, onSelect, selected, labelKey }: OptionProp) {

    return (
        <div className={`group flex w-full z-20 rounded-[5px]
            ${selected 
                ? 'border border-[#ff6b00] bg-[#fff0d3]' 
                : 'border border-[#292929]/15 hover:border-[#292929]/35 active:border-[#292929]/15 bg-[#f2f2f2]/50'
            } 
        `}>
            <input type="checkbox" name={labelKey} id={id} hidden onChange={onSelect}/>
            <label htmlFor={id}
            className={`flex items-center justify-between w-full p-[0.75rem] cursor-pointer`}>
                <div className="flex items-center gap-[0.5rem]">
                    <div className={`w-3 h-2 border-2 p-[0.3rem] rounded-[3px]
                        ${selected
                            ? 'border-[#ff6b00]/50 group-hover:border-[#ff6b00]/75 group-active:border-[#ff6b00]/50 bg-[#ff6b00]' 
                            : 'border-[#292929]/50 group-hover:border-[#292929]/75 group-active:border-[#292929]/50'
                        }      
                    `} />
                    <span className={`text-[14px] text-[#292929] text-wrap font-bold leading-none`}>{option}</span>
                </div>

                <span className={`text-[14px] text-[#ff6b00] text-wrap font-bold leading-none`}>{currencyFormat(price)}</span>
            </label>
        </div>
    )
}

export default CheckboxType