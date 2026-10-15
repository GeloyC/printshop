
export type BasicInformationType = {
    name: string,
    description: string,
    base_price: string
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

export type fileRequirement = {
    extension: string
}

export type SelectedServiceType = {
    id: string,
    thumbnail_url: string,
    name: string,
    description: string,
    base_price: number,
    file_requirements: fileRequirement[],
    configuration: string, // backend returns a json so the type is string -> should be parsed when displaying the data
    created_at: string,
    updated_at: string
}


export type ServiceItemType = {
    id: string,
    name: string,
    base_price?: number,
    file_requirements: fileRequirement[], 
    thumbnail_url: string,
    slug: string,
    created_at?: string
}

