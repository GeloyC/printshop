
import { Link } from "react-router-dom";
import Cart from '/src/assets/icon/cart.svg?react'

type CartButtonProp = {
    closeDropdowns: ()=>void
    itemCount: number
}
function CartButton ({ closeDropdowns, itemCount }:CartButtonProp) {

    return (
        <div onClick={closeDropdowns} className='relative'>
            <Link to="/cart" className={`relative flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-[#fff] active:bg-[#f2f2f2] rounded-[10px] cursor-pointer transition-all duration-100`}>
                <div className="flex items-center gap-[0.3rem]">
                    <Cart className="size-6 opacity-80"  />
                    {/* <span className="text-[14px] text-[#fff] font-bold leading-none">Cart</span>  */}
                </div>

                <div className='absolute -top-1 -left-1 h-[1.2rem] w-[1.2rem] flex items-center justify-center bg-[#ff6b00] border-2 border-[#fff] rounded-full'>
                    <span className='text-[#fff] text-[12px] font-bold leading-none'>
                        { itemCount > 9 ? '+9' : itemCount }
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default CartButton;