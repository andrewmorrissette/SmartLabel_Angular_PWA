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
    tags?:[number]
    acf?:acf

    


    
}

export interface acf{
    content?:string
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