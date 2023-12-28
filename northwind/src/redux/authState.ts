import { createStore } from "redux";

//1. state
export class authState{
    public token: string = '';
    public constructor(){
        this.token = localStorage.getItem('token') || '';
    }
}
//2. action types enum
export enum AuthActionType{
    Signup = 'Signup',
    Login = 'Login',
    Logout = 'Logout'
}
//3. action interface
export interface AuthAction{
    type:AuthActionType,
    payload: string
}
//4. reducer
export function authReducer(currentState = new authState(), action: AuthAction): authState{
    const newState = {...currentState};

    switch(action.type){
        //sign up and login had same code, so cuz theres no break it will execute login code.
        case AuthActionType.Signup:
        case AuthActionType.Login:
            newState.token = action.payload;
            localStorage.setItem('token', newState.token);
            console.log("our jwt is "+action.payload);
            break;
        case AuthActionType.Logout:
            break;
                 
    }

    return newState;
}
//5. store
export const authStore = createStore(authReducer);