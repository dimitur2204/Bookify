import { IBook } from "src/app/book/interfaces/book";
import { IShoppingCart } from "src/app/shopping/interfaces/shopping-cart";
import { IRegisterData } from "./registerData";

export interface IUser extends IRegisterData{
    id:String;
    imageUrl:String;
    books:IBook[];
    createdAt:Date;
    shoppingCart?:IShoppingCart;
}