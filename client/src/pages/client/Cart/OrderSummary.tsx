
/*
* If a user is not logged in, an alert window must pop once the 'Confirm Order button' is clicked
* Files and configurations for each must not be wiped during login and must continue normally after successfully login
*/

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import currencyFormat from "../../../utils/currencyFormat";
import type { CartItemType } from "../../../types/file.type";

import { checkoutItems } from "../../../api/order.api";
import { useUserContext } from "../../../context/userContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";


type OrderSummaryProp = {
    fileQuantity: number
    subTotalPrice: number
    cartItems: CartItemType[]
}

function OrderSummary ({ 
    fileQuantity, 
    subTotalPrice, 
    cartItems 
}: OrderSummaryProp) {

    const { user } = useUserContext();
    const navigate = useNavigate();

    const handleConfirmOrder = () => {
        navigate('/order-confirmation', {
            state: {
                orders: cartItems
            }
        })
    }

    //  TODO -- send to orders table:
    //  user_id
    //  service_id --> get the service_id using the slug from CartItems 'SELECT id FROM     services WHERE slug = cartItems.slug'
    //  create reference_number on Laravel
    //  send the cartItems data to order_items table
    const queryClient = useQueryClient();
    const handleCheckout = useMutation({
        mutationFn: async () => {
            return await checkoutItems(cartItems);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
            console.log('checkout successful!');
            handleConfirmOrder();
        }, onError: (err: unknown) => {
            if (axios.isAxiosError(err)) {
                console.error('Message:', err.message);
                console.error('Status:', err.response?.status);
                console.error('Response:', err.response?.data);
                console.error('Request:', err.request);
            } else {
                console.error(err);
            }
        }
    });



    return (
        <section className="sticky top-[5rem] flex flex-col h-fit gap-[0.5rem] rounded-[10px]">
            <span className="text-[24px] text-[#292929] font-bold leading-none">Order summary</span>

            <div className="flex items-center justify-between py-[0.5rem]">
                <span className="text-[16px] text-[#292929] opacity-80">Total ({fileQuantity}x)</span>
                <span className="text-[16px] text-[#292929] font-bold">{currencyFormat(Number(subTotalPrice))}</span>
            </div>

            <button onClick={() => handleCheckout.mutate()} className="flex items-center justify-center  bg-[#ff6b00] hover:bg-[#cc4c02] active:bg-[#ff6b00] w-full py-[0.5rem] rounded-[5px] cursor-pointer transition-all duration-200">
                {handleCheckout.isPending ? (
                    <LoadingSpinner size={15} color="#FFF" />
                ): (
                    <span className="text-[16px] text-[#fff]">Confirm Order</span>
                )}
            </button>
        </section>
    )
}

export default OrderSummary;