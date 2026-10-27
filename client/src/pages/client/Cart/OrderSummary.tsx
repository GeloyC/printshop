
/*
* If a user is not logged in, an alert window must pop once the 'Confirm Order button' is clicked
* Files and configurations for each must not be wiped during login and must continue normally after successfully login
*/

import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../context/cartContext";
import currencyFormat from "../../../utils/currencyFormat";

type OrderSummaryProp = {
    fileQuantity: number
    subTotalPrice: number
}

function OrderSummary ({ fileQuantity, subTotalPrice }: OrderSummaryProp) {

    const navigate = useNavigate();
    const { items, setItems } = useCartContext();

    const handleConfirmOrder = () => {

        // pass the data of setItems to folderContext so the data/order transaction will be saved to the folders page
        navigate('/order-confirmation', {
            state: {
                orders: items
            }
        })

        setItems([]); // this will be empty after the function is called successfully
    }



    return (
        <section className="sticky top-[5rem] flex flex-1 flex-col gap-[0.5rem]">
            <span className="text-[24px] text-[#292929] font-bold leading-none">Order summary</span>

            <div className="flex items-center justify-between py-[0.5rem]">
                <span className="text-[16px] text-[#292929] font-bold">Total ({fileQuantity}x)</span>
                <span className="text-[16px] text-[#ff6b00] font-bold">{currencyFormat(Number(subTotalPrice))}</span>
            </div>

            <button onClick={handleConfirmOrder} className="bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] w-full py-[0.5rem] rounded-[5px] cursor-pointer transition-all duration-200">
                <span className="text-[16px] text-[#fff]">Confirm Order</span>
            </button>
        </section>
    )
}

export default OrderSummary;