import axios from "axios";
import SignUp from "../models/signUpModel";
import appConfig from "../utils/AppConfig";
import { AuthAction, AuthActionType, authStore } from "../redux/authState";
import login from "../models/LoginModel";

class Auth {
    //<string> for jwt
    public async signup(signup: SignUp):Promise<string>{
       const response = await axios.post<{jwt: string}>(appConfig.signUpUrl, signup);
       const token = response.data.jwt;

       //redux
    //    create acton
    const action: AuthAction = {
        type: AuthActionType.Signup,
        payload: token
    }

    //now all that is left to do is to send this action to redux
    authStore.dispatch(action)
    
        return token;
    }
    public async login(login: login):Promise<string>{
        //cuz jwt is {jwt} on backend
        const response = await axios.post<{jwt: string}>(appConfig.loginUrl, login);
        const token = response.data.jwt;
 
        //redux
     //    create acton
     const action: AuthAction = {
         type: AuthActionType.Login,
         payload: token
     }
 
     //now all that is left to do is to send this action to redux
     authStore.dispatch(action)
     
         return token;
     }
     public logout(){
        const action: AuthAction = {
            type: AuthActionType.Logout,
            payload: null
        }
        authStore.dispatch(action)
    }
}

const auth = new Auth();
export default auth;