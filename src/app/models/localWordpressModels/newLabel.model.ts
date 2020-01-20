import { Url } from 'url';


export interface newLabel{
    id?:number,
    date?:Date,
    slug?:string,
    type?:string,
    title?:Title,
    acf?:Acf,
}

export interface Title{
    rendered?:string,
}

export interface Acf{
    artwork?:Array<number>,
    firstBody?: string,
    secondBody?:string,
    thirdBody?:string,
    fourthBody?:string,
    firstExtended?:number,
    secondExtended?:number,
    thirdExtended?:number,
    fourthExtended?:number,
    additionalContent?:string
}