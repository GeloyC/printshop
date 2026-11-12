
import { useSearchParams } from "react-router-dom"

// components
import OrdersForm from "./OrdersForm"

// hooks
import { useGetOrdersByStatus } from "../../../hooks/orders/order.hook"


function Orders () {

    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get('status') ?? '';

    const { data: orders = [] } = useGetOrdersByStatus(String(status));



    return <OrdersForm 
        setSearchParams={setSearchParams}
        status={status}
        orders={orders}
    />
}

export default Orders