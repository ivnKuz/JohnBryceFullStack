import { useForm } from "react-hook-form";
import "./Signup.css";
import SignUp from "../../../models/signUpModel";
import notify from "../../../services/Notify";

function Signup(): JSX.Element {
    const {register, handleSubmit} = useForm<SignUp>();

    async function submitUserData(signUpModel: SignUp): Promise<void>{
        try{

        }catch(err){
            notify.error(err);
        }
    }
    return (
        <div className="Signup">
            <form onSubmit={handleSubmit(submitUserData)}>
                <label htmlFor="">First Name: </label>
                <input type="text" {...register('firstName')}/>
                <label htmlFor="">Last Name: </label>
                <input type="text" {...register('lastName')}/>
                <label htmlFor=""> Email: </label>
                <input type="email" {...register('email')}/>
                <label htmlFor="">Password: </label>
                <input type="password" {...register('password')}/>
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
