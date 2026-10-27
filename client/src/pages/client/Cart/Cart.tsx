import { useServiceConfigurations } from "../../../hooks/services/useServices"
import CartForm from "./CartForm"


function Cart () {

    const {data: configurations = []} = useServiceConfigurations();


    return <CartForm 
        configurations={configurations}
    />
}

export default Cart