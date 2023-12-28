import { useEffect, useState } from "react";
import "./AuthMenu.css";
import { authState, authStore } from "../../../redux/authState";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import auth from "../../../services/Auth";
import notify from "../../../services/Notify";

function AuthMenu(): JSX.Element {
    type User = {firstName:string, lastName:string};
    const navigate = useNavigate();
    const [user, setUSer] = useState<User>();

    useEffect(()=>{
        const token = authStore.getState().token;
        if(token){
            const user = jwtDecode<{user: User}>(token).user;
            console.log(user);
            
            setUSer(user)
         }
     const unsubscribe = authStore.subscribe(()=>{
        const token = authStore.getState().token;
        if(token){
   
           const user = jwtDecode<{user: User}>(token).user;
           console.log(user);
           
            setUSer(user)
        }else{
            setUSer(undefined)
        }
     });
     return unsubscribe
    },[]);
    function logout(){
        notify.success(`Logged out successfully`)
        auth.logout();
    }
    return (
        
        <div className="AuthMenu">
            {!user && 
            <div>
                <span>Hello Guest |</span>
                <NavLink to="/signup">Sign Up</NavLink>
                <span>|</span>
                <NavLink to="/login">Login</NavLink>
            </div>
            }
            {user &&  
            <div>
                <span>Hello {user.firstName} | </span>
                <NavLink to="/home" onClick={logout}>Logout</NavLink>
            </div>
            }
        </div>
    );
}

export default AuthMenu;
