import { Title } from '@angular/platform-browser';
import { Content } from '@angular/compiler/src/render3/r3_ast';

export interface selectedLabels{
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
content?:content,
excerpt?:excerpt,
author?: number,
featured_media?: number,
parent?: number,
menu_order?: number,
comment_status?: string,
ping_status?: string,
template?: string,
acf?:acf
}

export interface guid{
    rendered?:string
}
export interface title{
    rendered?:string
}
export interface content{
    rendered?:string,
    protected:boolean
}
export interface excerpt{
    rendered?:string,
    protected?:boolean
}
export interface acf{
    'smart-label-1'?: number,
    'smart-label-2'?:number
}