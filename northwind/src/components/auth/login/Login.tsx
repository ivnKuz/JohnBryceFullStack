import { useNavigate } from "react-router-dom";
import "./Login.css";
import SignUp from "../../../models/signUpModel";
import { useForm } from "react-hook-form";
import auth from "../../../services/Auth";
import notify from "../../../services/Notify";
import login from "../../../models/LoginModel";
import { useEffect } from "react";
import { authStore } from "../../../redux/authState";

function Login(): JSX.Element {
    const {register, handleSubmit} = useForm<SignUp>();
    const navigate = useNavigate();

    async function submitLoginData(loginModel: login): Promise<void>{
        try{
            await auth.login(loginModel);
            notify.success('You have been successfully logged in');
            navigate('/home');
        }catch(err){
            notify.error(err);
        }
    }
    useEffect(()=>{
        const token = authStore.getState().token;
        if(token){
            notify.error('You are already logged in')
            navigate('/home')
        }
    },[])
    return (
        <div className="Login">

                <h2>Login</h2>
			  <form onSubmit={handleSubmit(submitLoginData)}>
                <label htmlFor=""> Email: </label>
                <input type="email" {...register('email')}/>
                <label htmlFor="">Password: </label>
                <input type="password" {...register('password')}/>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
