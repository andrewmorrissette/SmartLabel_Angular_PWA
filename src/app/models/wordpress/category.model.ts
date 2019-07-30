export interface Category{
    id?:number,
    count?:number,
    description?:string,
    link?:string,
    name?:string,
    slug?:string,
    taxonomy?:string,
    parent?:number,
    meta?:any,

    // constructor(category:any){
    //     this.id = category.id;
    //     this.count = category.count;
    //     this.description = category.description;
    //     this.link = category.link;
    //     this.meta = category.meta;
    //     this.name = category.name;
    //     this.parent = category.parent;
    //     this.slug = category.slug;
    //     this.taxonomy = category.taxonomy;
    // }
}