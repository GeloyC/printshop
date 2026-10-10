
export type BasicInformationType = {
    name: string,
    description: string,
    base_price: number
}

export type ConfigurationType = 
    '' 
    | "text" 
    | "select" 
    | "checkbox" 
    | "radio";

export type ConfigurationOptions = { 
    id: string, 
    option: string, 
    price: number 
}


export type Configuration = {
    id: string,
    key: string,
    label: string,
    type?: ConfigurationType | null,   
    options: ConfigurationOptions[]
}

export type SelectedServiceType = {
    id: string,
    name: string,
    description: string,
    base_price: number,
    configuration: string, // backend returns a json so the type is string -> should be parsed when displaying the data
    created_at: string,
    updated_at: string
}

export type ServiceItemType = {
    id: string,
    name: string,
    base_price?: number,
    thumbnail_url: string,
    slug: string,
    created_at?: string
}