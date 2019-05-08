export interface Brand {
    id_brand: number,
    id_destaque: number,
    brand: string,
    image_url: string,
    list_order: string,
    logo_url: string,
    subdivision: Subdivision[],
    color: any,
    tag: any
}

export interface Subdivision {
    id_subdivision: number,
    sub: string,
    image_url: string,
    logo_url: string
}