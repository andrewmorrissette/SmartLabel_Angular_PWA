export interface Comment{
    id?:number,
    author?:number,
    author_email?:string,
    author_ip?:string,
    author_name?:string,
    author_url?:string,
    author_user_agent?:string,
    content?:Content,
    date?:Date,
    date_gmt?:Date,
    link?:string,
    parent?:number,
    post?:number,
    status?:string,
    type?:string,
    author_avatar_urls?:AuthorAvatarUrls,
    meta?:any


}
export interface Content{
    rendered?:string

}
export interface AuthorAvatarUrls{
    rendered?:string,
    24?:string,
    48?:string,
    96?:string
}
