import { Url } from 'url';

export interface Post{
    date?:Date,
    date_gmt?:Date,
    guid?:Guid,
    id?:number,
    link?:Url,
    modified?:Date,
    modified_gmt?:Date,
    slug?:string,
    status?:string,
    type?:string,
    password?:string,
    permalink_template?:string,
    generated_slug?:string,
    title?:Title,
    content?:Content,
    author?:number,
    excerpt?:Excerpt,
    featured_media?:number,
    comment_status?:string,
    ping_status?:string,
    format?:string,
    meta?:Meta,
    sticky?:boolean,
    template?:string,
    ondisplay?:[number],
    tags?:[number],
    acf?:acf

    


    
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
    source?:string,
    ios_source?:string,
    alt_text?:string,
    objects?:boolean,
    audio?:string
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

export interface Guid{
    rendered?:string

}

export interface Title{
    rendered?:string
}

export interface Content{
    rendered?:string,
    protected?:boolean

}
export interface Excerpt{
    rendered?:string,
    protected?:boolean

}

export interface Meta{
    amp_status?:string,
    spay_email?:string,
    jetpack_publicize_message?:string
}