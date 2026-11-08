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

export interface OrderData {
    id: string,
    reference_number: string,
    status: string,
    created_at: string,
    updated_at: string,
    order_total: number,
    current_status: string,
    status_changed_at: string,
    order_items: string
}