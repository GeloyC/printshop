import type { Metadata, SelectedOption } from "./file.type"

export type Order = {
    id: string,
    reference_number: string,
    status: string,
    updated_at: string,
    number_of_files: number,
    total_paid: number
}

export type OrderItem = {
    id: string,
    file_url: string, 
    metadata: Metadata,
    configuration: SelectedOption[],
    slug: string,
    additional_instruction?: string,
    quantity: number,
    unit_price: string,
    total_price: string
}


export type OrderStatusHistoriesType = {
    id: string,
    status: string,
    updated_at: string
}

export interface OrderData {
    id: string,
    reference_number: string,
    customer_name?: string,
    user_id?: string,
    status: string,
    created_at: string,
    updated_at: string,
    order_total: number,
    order_status_histories: OrderStatusHistoriesType[],
    order_items: string
}

// admin order
export type OrderAdmin = {
    id: string,
    reference_number: string,
    customer_name: string,
    status: string,
    updated_at: string
}