export interface smartLabel{
    id?:number,
    date?:Date,
    date_gmt?:Date,
    guid?:guid,
    modified?:Date,
    modified_gmt?:Date,
    slug?:string,
    status?:string,
    type?:string,
    link?:string,
    title?:title,
    comment_status?: string,
    ping_status?: string,
    template?: string,
    acf?:acf,
    smart_labels?:number[],
    }
    
    export interface guid{
        rendered?:string
    }
    export interface title{
        rendered?:string
    }
    export interface acf{
        image?:image
        artist_name?:string,
        artist_location?:string,
        artist_birth_year?:string,
        artwork_title?:string,
        artwork_year:string,
        artwork_materials?:string,
        acknowledgements?:string,
        content?:string,
        video?:string,
        audio?:string,
        qr_image?:image
    }
    
    export interface image{
        ID?:number,
        id?:number,
        title?:string,
        filename?:string,
        filesize?:number,
        url?:string,
        link?:string,
        alt?:string,
        author?:string,
        description?:string,
        caption?:string,
        name?:string,
        status?:string,
        uploaded_to?:number,
        date?:Date,
        modified?:Date,
        menu_order?:number,
        mime_type?:string,
        type?:string,
        subtype?:string,
        icon?:string,
        width?:number,
        height?:number,
        sizes?:sizes
    }
    export interface sizes{
        thumbnail?:string,
        "thumbnail-width"?:number,
        "thumbnail-height"?:number,
    
        medium?:string,
        "medium-width"?:number,
        "medium-height"?:number,
    
        medium_large?:string,
        "medium_large-width"?:number,
        "medium_large-height"?:number,
    
        large?:string,
        "large-width"?:number,
        "large-height"?:number,
    }