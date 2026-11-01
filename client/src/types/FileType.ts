import type { Configuration } from "./service/service"

export type fileConfigType = {
    id: string,
    configuration: Configuration[],
    slug: string
}

export type Metadata = {
    file_name: string,
    file_size: number,
    file_type: string,
    last_modified: string
}

export type fileItem = {
    id: string,
    file: File,
    metadata?: Metadata,
    quantity: number,
    slug: string,
    configuration?: SelectedOption[],
    additional_instruction?: string,
    unit_price?: number,
    total_price?: number
}

export type SelectedOption = { // for confiugred file
    id: string,
    category: string,
    option: string,
    price: number
}
