
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
    | "radio" 
    | "number";

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

