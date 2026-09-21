
type TextTypeProps = { configLabel: string }
function TextType ({ configLabel }:TextTypeProps) { 

    return (
        <div className={`group flex flex-col w-full gap-[0.5rem]`}>
            <span className="text-[14px] text-[#575757] font-bold leading-none">{configLabel}</span>

            <textarea name="config_text" id="config_text" rows={3}
            className="bg-[#f2f2f2]/50 rounded-[5px] border border-[#292929]/15 hover:border-[#292929]/35 active:border-[#292929]/15 z-10 w-full p-[0.5rem] text-[14px] font-bold focus:outline-[#ff6b00]"
            ></textarea>
        </div>
    )
}

export default TextType;