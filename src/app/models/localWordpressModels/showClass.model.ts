export class Show{
    showName:string;
    showID:number;
    showPostID?:number;

    constructor(name:string,id:number,postID:number = 0){
        this.showName = name;
        this.showID = id;
        this.showPostID=postID;
    }
}