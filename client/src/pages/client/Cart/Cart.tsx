
// component
import CartItem from "./CartItem"


function Cart () {

    return (
        <div className="fade-up relative flex items-start w-full py-[1rem] gap-[1rem]">

            <section className="flex flex-2 flex-col items-start w-full h-full pb-[1rem] gap-[0.5rem]">
                <span className="text-[24px] text-[#292929] font-bold leading-none">Cart</span>
                {/* Item block */}
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </section>

            <section className="sticky top-[5rem] flex flex-1 flex-col gap-[0.5rem]">
                <span className="text-[24px] text-[#292929] font-bold leading-none">Order summary</span>

                <div className="flex items-center justify-between py-[0.5rem]">
                    <span className="text-[16px] text-[#292929] font-bold">Total (10x)</span>
                    <span className="text-[16px] text-[#ff6b00] font-bold">Php 100.00</span>
                </div>

                <button className="bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] w-full py-[0.5rem] rounded-[5px] cursor-pointer transition-all duration-200">
                    <span className="text-[16px] text-[#fff]">Confirm Order</span>
                </button>
            </section>

        </div>
    )
}

export default Cart