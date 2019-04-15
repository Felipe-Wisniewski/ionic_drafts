export class TemplatesResponse {
    public templates: Template[] = null;
    public page: number;
    public pages: number;
    public messages: string[] = null;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class Template {
    public id_brand: string;
    public status: string;
    public registration_user: string;
    public registration_date: string;
    public alteration_user: string;
    public alteration_date: string;
    public id_lang: string;
    public id_template: string;
    public json: Json;
    public brand: Brand;
}

export class Json {
    public version: string;
    public objects: Objects[] = null;
    public background: string;
    public lockNewObjects: boolean;
    public name: string;
    public thumbnailUrl: string;
    public thumbnail: string;
}

export class Brand {
    public id: number;
    public brand: string;
    public image_url: string;
    public list_order: string;
    public logo_url: string;
    public color: string[] = null;
    public tag: object[] = null;
}

export class Objects {
    public type: string;
    public version: string;
    public originX: string;
    public originY: string;
    public left: number;
    public top: number;
    public width: number;
    public height: number;
    public fill: string;
    public stroke: any;
    public strokeWidth: number;
    public strokeDashArray: any;
    public strokeLineCap: string;
    public strokeLineJoin: string;
    public strokeMiterLimit: number;
    public scaleX: number;
    public scaleY: number;
    public angle: number;
    public flipX: boolean;
    public flipY: boolean;
    public opacity: number;
    public shadow: any;
    public visible: boolean;
    public clipTo: any;
    public backgroundColor: string;
    public fillRule: string;
    public paintFirst: string;
    public globalCompositeOperation: string;
    public transformMatrix: any;
    public skewX: number;
    public skewY: number;
    public crossOrigin: string;
    public cropX: number;
    public cropY: number;
    public removable: boolean;
    public maxWidth: number;
    public maxHeight: number;
    public controls: string;
    public cornerStyle: string;
    public cornerSize: number;
    public rotatingPointOffset: number;
    public changeColor: boolean;
    public changeFont: boolean;
    public lockMovementX: boolean;
    public lockMovementY: boolean;
    public selectable: boolean;
    public lockUniScaling: boolean;
    public evented: boolean;
    public src: string;
    public filters: any[] = null;
}