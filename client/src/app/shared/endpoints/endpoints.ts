import { environment } from "../../../environments/environment";
const apiUrl = environment.apiUrl;
export const endpoints = {
    auth:{
        register:apiUrl + '/auth' + '/register',
        login:apiUrl + '/auth' + '/login',
        currentUser:apiUrl + '/auth' + '/me',
    },
    books:{
        all:apiUrl + '/books',
        byId:(id:String) => apiUrl + '/books' + id
    },
    cart:{
        current:apiUrl + '/cart' + '/',
        bookById:(id:String)=> apiUrl + '/cart' + '/books' + id
    }
}