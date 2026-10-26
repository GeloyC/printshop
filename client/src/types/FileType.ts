import type { Configuration } from "./service/service"

export type fileConfigType = {
    id: string,
    configuration: Configuration[],
    slug: string
}


export type fileItem = {
    id: string,
    file: File,
    quantity: number
    slug: string,
    configuration?: SelectedOption[]
}


export type SelectedOption = { // for confiugred file
    id: string,
    category: string,
    option: string,
    price: number
}

export type FileWithConfig = {
    id: string,
    file: File,
    configuration: SelectedOption[]
}