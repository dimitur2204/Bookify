import { IBook } from './book';

export interface ICart {
    books: IBook[];
    createdAt: Date;
    _id: string;
    user: string;
    __v: number;
}