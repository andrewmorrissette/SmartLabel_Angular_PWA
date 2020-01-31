import { Url } from 'url';

export interface extendedLabel{
id?:number,
date?:Date,
title?:Title,
acf?:ACF
}

export interface Title{
    rendered:string
}

export interface ACF{
    label:any,
    extended_image:Image,
    video_url:string,
    content:string,
}

export interface Image{
    url:Url,
    width:number,
    height:number
}