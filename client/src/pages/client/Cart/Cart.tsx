import { UserContext, useUserContext } from "../../../context/userContext";
import { useGetCartItems } from "../../../hooks/cart/orderItems";
import { useServiceConfigurations } from "../../../hooks/services/useServices"
import CartForm from "./CartForm"


function Cart () {

    const { user } = useUserContext();
    const {data: configurations = []} = useServiceConfigurations();
    const {data: orderItems = []} = useGetCartItems(user?.id)

    return <CartForm 
        configurations={configurations}
        orderItems={orderItems}
    />
}

export default Cart