
import { useGetOrdersAdmin } from "../../../hooks/orders/order.hook";
import OrdersAdminForm from "./OrdersAdminForm";


function OrdersAdmin () {

    const { data: orders=[] } = useGetOrdersAdmin();


    return <OrdersAdminForm 
        orders={orders}
    />
}


export default OrdersAdmin;