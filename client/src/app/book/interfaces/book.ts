import { Categories } from "../enums/categories";

export interface IBook{
    title:String;
    price:Number;
    categories:Categories[];
    createdAt:Date;
}