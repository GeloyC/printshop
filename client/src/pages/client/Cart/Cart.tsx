import TopLoadingBar from "../../../components/ui/TopLoadingBar";
import { useUserContext } from "../../../context/userContext";
import { useGetCartItems } from "../../../hooks/cart/order_item.hook";
import { useServiceConfigurations } from "../../../hooks/services/useServices"
import CartForm from "./CartForm"


function Cart () {

    const { user } = useUserContext();
    const {data: configurations = []} = useServiceConfigurations();
    const {data: orderItems = [], isFetching: isLoading} = useGetCartItems(user?.id)

    if (isLoading) {
        <TopLoadingBar 
            isLoading={isLoading}
        />
    }

    return <CartForm 
        configurations={configurations}
        orderItems={orderItems}
    />
}

export default Cart