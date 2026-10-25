import currencyFormat from "../../../utils/currencyFormat"


type OptionProp = {
    id: string,
    option: string,
    price: number
    onSelect: () => void,
    selected: boolean
    labelKey: string
}

function RadioType ({ id, option, price, onSelect, selected, labelKey }: OptionProp) {


    return (
        <div 
        className={`group flex w-full bg-[#f2f2f2]/50 rounded-[5px] z-20 
            ${selected 
                ? 'border border-[#ff6b00] bg-[#fff0d3]' 
                : 'border border-[#292929]/15 hover:border-[#292929]/35 active:border-[#292929]/15'
            } 
        `}>

            <input type="radio" name={labelKey} id={id} hidden 
                onChange={() => {
                    onSelect();
                }}

            />
            <label htmlFor={id}
            className={`flex items-center justify-between w-full gap-[0.5rem] p-[0.75rem] cursor-pointer`}>
                <div className="flex gap-[0.5rem]">
                    <div className={`w-3 h-2 border-2 p-[0.3rem] rounded-full
                        ${selected
                            ? 'border-[#ff6b00]/50 group-hover:border-[#ff6b00]/75 group-active:border-[#ff6b00]/50 bg-[#ff6b00]' 
                            : 'border-[#292929]/50 group-hover:border-[#292929]/75 group-active:border-[#292929]/50'
                        }    
                    `} />
                    <span className={`text-[14px] ${selected ? 'text-[#ff6b00]' : 'text-[#292929]'} text-wrap font-bold leading-none`}>{option}</span>
                </div>

                <span className={`text-[14px] text-[#ff6b00] text-wrap font-bold leading-none`}>{currencyFormat(price)}</span>
            </label>
        </div>
    )
}

export default RadioType