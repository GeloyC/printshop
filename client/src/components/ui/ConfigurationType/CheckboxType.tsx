

function CheckboxType () {

    return (
        <div className={`group flex w-full bg-[#f2f2f2]/50 border border-[#292929]/15 hover:border-[#292929]/35 active:border-[#292929]/15 z-20 rounded-[5px]`}>
            <input type="checkbox" name="key" id="label" hidden/>
            <label htmlFor="label"
            className={`flex items-center justify w-full gap-[0.5rem] p-[0.75rem] cursor-pointer`}>
                <div className={`border-2 border-[#292929]/50 group-hover:border-[#292929]/75 group-active:border-[#292929]/50 p-[0.3rem] rounded-[3px]`} />
                <span className={`text-[14px] text-[#292929] text-wrap font-bold leading-none`}>Name of the option</span>
            </label>
        </div>
    )
}

export default CheckboxType