import { IBook } from "src/app/book/interfaces/book";
import { Roles } from "../enums/roles";

export interface IRegisterData{
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    role:Roles;
}