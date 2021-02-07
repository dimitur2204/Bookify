import { IUser } from "src/app/auth/interfaces/user";
import { Categories } from "../enums/categories";

export interface IBook{
    id:String;
    title: String;
	description: String;
	imageUrl?: String;
	imageId?: String;
	user: IUser;
	price: Number;
	categories: Categories[];
	previewUrl?:String;
	previewId?:String;
	buyers: IUser[];
	createdAt:Date;
}