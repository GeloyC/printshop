
type RedirectAlertProp = {
    stayPage: () => void
    leavePage: () => void
}

function RedirectAlert ({
    stayPage,
    leavePage
}: RedirectAlertProp) {

    return (
        <div className="flex flex-col items-center w-[400px] bg-[#fff] rounded-[10px] p-[2rem] gap-[2rem]">
            <span className="text-[24px] text-[#292929] font-bold leading-none">Leaving already?</span>

            <p className="text-[16px] font-bold leading-tight text-[#292929] opacity-75">
                Some files are still not configured, the files you uploaded will be erased once you leave this page. Are you sure you want to leave?
            </p>

            <div className="flex items-center gap-[0.3rem] w-full">
                <button onClick={stayPage} className="bg-[#f2f2f2] hover:bg-[#B1B2B5]/50  active:bg-[#f2f2f2] w-full py-[0.75rem] rounded-[10px] cursor-pointer transition-all duration-200">
                    <span className="text-[14px] text-[#292929] font-bold leading-none">Cancel</span>
                </button>

                <button onClick={leavePage} className="bg-[#FF0000] hover:bg-[#ca0000] active:bg-[#FF0000] w-full py-[0.75rem] rounded-[10px] cursor-pointer transition-all duration-200">
                    <span className="text-[14px] text-[#fff] font-bold leading-none">Confirm</span>
                </button>
            </div>
        </div>
    )
}

export default RedirectAlert;