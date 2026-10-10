
export type ServiceType = {
    id: string,
    thumbnail_url: string,
    name: string,
    slug: string,
    created_at: string,
    base_price: number
}

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

