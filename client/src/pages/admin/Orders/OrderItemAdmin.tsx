

function OrderItemAdmin () {

    return (
        <div 
            className="grid grid-cols-[1fr_4fr_4fr_4fr_4fr] w-full bg-[#fafafa] hover:bg-[#ffdca5] active:bg-[#ffc36d] border-b border-[#292929]/10 cursor-pointer transition-all duration-200"
        >
            <div className="flex items-center justify-center p-[1rem]">
                <input type="checkbox" name="" id="" />
            </div>

            <div className="flex items-center justify-start w-full py-[1rem]">
                <span className="text-sm text-[#292929] font-bold leading-none">ORD-HRGGW98V</span>
            </div>

            <div className="flex items-center justify-start w-full py-[1rem]">
                <span className="text-sm text-[#292929] font-bold leading-none">Angelo Cabangal</span>
            </div>

            <div className="flex items-center justify-start w-full py-[1rem]">
                <span className="text-sm text-[#292929] font-bold leading-none">Order placed</span>
            </div>

            <div className="flex items-center justify-start w-full py-[1rem]">
                <span className="text-sm text-[#292929] font-bold leading-none">Nov 11, 2026 4:46 am</span>
            </div>
        </div>
    )
}


export default OrderItemAdmin;