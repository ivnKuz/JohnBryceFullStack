import { createStore } from "redux";

//1. state
export class authState{
    public token: string = '';

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
    payload: any
}
//4. reducer
export function authReducer(currentState = new authState(), action: AuthAction): authState{
    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.Signup:
            break;
        case AuthActionType.Login:
            break;
        case AuthActionType.Logout:
            break;
                 
    }

    return newState;
}
//5. store
export const authStore = createStore(authReducer);