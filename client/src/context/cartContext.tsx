import { useContext, createContext, useState, type SetStateAction } from "react";
import type { fileItem } from "../types/FileType";


type cartContextProp = {
    items: fileItem[],
    setItems: React.Dispatch<SetStateAction<fileItem[]>>
}

export const CartContext = createContext<cartContextProp|null>(null);

export function CartProvider ({ children }:{children:React.ReactNode}) {

    const [ items, setItems ] = useState<fileItem[]>([])

    return (
        <CartContext.Provider value={{
            items,
            setItems
        }}>
            {children}
        </CartContext.Provider>
    )
}


export function useCartContext() {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('useCartContext must be used within CartProvider')
    }

    return cartContext;
}