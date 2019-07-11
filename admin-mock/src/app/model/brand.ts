export interface Brand {
    id: number,
    id_highlight: number,
    brand: string,
    image_url: string,
    list_order: string,
    logo_url: string,
    subdivisions: Subdivision[],
    color: any,
    tag: any
}

export interface Subdivision {
    id_subdivision: number,
    subdivision: string,
    image_url: string,
    logo_url: string
}