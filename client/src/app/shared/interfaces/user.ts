import { IBook } from './book';

export interface IUser {
    imageUrl: string;
    books: IBook[];
    role: string;
    createdAt: Date;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    __v: number;
}