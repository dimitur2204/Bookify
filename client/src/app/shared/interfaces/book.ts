import { IUser } from './user';

export interface IBook {
    imageUrl: string;
    categories: string[];
    buyers: IUser[];
    createdAt: Date;
    _id: string;
    title: string;
    price: number;
    imageId: string;
    previewId: string;
    previewUrl: string;
    fullBookId: string;
    author: IUser;
    __v: number;
}