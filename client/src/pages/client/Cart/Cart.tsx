import { useServiceConfigurations } from "../../../hooks/services/useServices"
import CartForm from "./CartForm"


function Cart () {

    const {data: configurations = []} = useServiceConfigurations();
    console.log('configurations from Cart: ', configurations);


    return <CartForm 
        configurations={configurations}
    />
}

export default Cart