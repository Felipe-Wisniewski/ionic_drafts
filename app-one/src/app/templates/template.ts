import { Brand } from '../home/brand';

export interface Template {
    id_brand: string,
    id_subdivision: string,
    layout: string,
    max_products: string,
    status: string,
    registration_user: string,
    registration_date: string,
    alteration_user: string,
    alteration_date: string,
    id_lang: string,
    id_template: string,
    brand: Brand,
    json: Json
}

export interface Json {
    name: string,
    thumbnailUrl: string 
}