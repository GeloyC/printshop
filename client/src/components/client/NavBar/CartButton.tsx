
import { Link } from "react-router-dom";
import Cart from '/src/assets/icon/cart.svg?react'

type CartButtonProp = {
    closeDropdowns: ()=>void
}
function CartButton ({closeDropdowns}:CartButtonProp) {

    return (
        <div onClick={closeDropdowns} className='relative'>
            <Link to="/cart" className={`relative flex p-[0.5rem] px-[1rem] bg-[#f2f2f2] hover:bg-[#B1B2B5]/50 active:bg-[#f2f2f2] rounded-[10px] cursor-pointer transition-all duration-100`}>
                <div className="flex items-center gap-[0.3rem]">
                    <Cart className="size-6 opacity-80" />
                    <span className="text-[14px] text-[#292929] font-bold leading-none">Cart</span> 
                </div>

                <div className='absolute -top-1 -left-1 h-[1.2rem] w-[1.2rem] flex items-center justify-center bg-[#ff6b00] rounded-full'>
                    <span className='text-[#fff] text-[12px] font-bold leading-none'>9+</span>
                </div>
            </Link>
        </div>
    )
}

export default CartButton;