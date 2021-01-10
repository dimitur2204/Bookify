import { ILoginInfo } from "./loginInfo";

export interface IUserInfo extends ILoginInfo{
    firstName:string;
    lastName:string;
    role:string;
}