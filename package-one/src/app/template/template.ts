export interface TemplatesResponse {
    templates: Template[],
    page: number,
    pages: number,
    messages: string[]
}

export interface Template {
    id_brand: string,
    status: string,
    registration_user: string,
    registration_date: string,
    alteration_user: string,
    alteration_date: string,
    id_lang: string,
    id_template: string,
    json: Json,
    brand: Brand
}

export interface Json {
    version: string,
    objects: Objects[],
    background: string,
    lockNewObjects: boolean,
    name: string,
    thumbnailUrl: string,
    thumbnail: string
}

export interface Brand {
    id: number,
    brand: string,
    image_url: string,
    list_order: string,
    logo_url: string,
    color: string[],
    tag: object[]
}

export interface Objects {
    type: string,
    version: string,
    originX: string,
    originY: string,
    left: number,
    top: number,
    width: number,
    height: number,
    fill: string,
    stroke: any,
    strokeWidth: number,
    strokeDashArray: any,
    strokeLineCap: string,
    strokeLineJoin: string,
    strokeMiterLimit: number,
    scaleX: number,
    scaleY: number,
    angle: number,
    flipX: boolean,
    flipY: boolean,
    opacity: number,
    shadow: any,
    visible: boolean,
    clipTo: any,
    backgroundColor: string,
    fillRule: string,
    paintFirst: string,
    globalCompositeOperation: string,
    transformMatrix: any,
    skewX: number,
    skewY: number,
    crossOrigin: string,
    cropX: number,
    cropY: number,
    removable: boolean,
    maxWidth: number,
    maxHeight: number,
    controls: string,
    cornerStyle: string,
    cornerSize: number,
    rotatingPointOffset: number,
    changeColor: boolean,
    changeFont: boolean,
    lockMovementX: boolean,
    lockMovementY: boolean,
    selectable: boolean,
    lockUniScaling: boolean,
    evented: boolean,
    src: string,
    filters: any[]
}