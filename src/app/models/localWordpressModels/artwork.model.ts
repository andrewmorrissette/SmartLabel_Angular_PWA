export interface Artwork{
    ID?:number,
    acf?:ACF
}

export interface ACF{
    artist?:string,
    artist_year?:string,
    artist_location?:string,
    artwork_title?:string,
    artwork_year?:string,
    materials?:string,
    acknowledgements?:string
}