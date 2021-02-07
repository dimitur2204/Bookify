import { IUser } from "src/app/auth/interfaces/user";
import { IBook } from "src/app/book/interfaces/book";

export interface IShoppingCart{
    user:IUser;  
    books:IBook[];
    createdAt:Date;
}