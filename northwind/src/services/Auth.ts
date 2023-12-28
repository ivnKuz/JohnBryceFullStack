import axios from "axios";
import SignUp from "../models/signUpModel";
import appConfig from "../utils/AppConfig";

class Auth {
    //<string> for jwt
    public async signup(signup: SignUp):Promise<string>{
       const response = await axios.post<string>(appConfig.signUpUrl, signup);
       const token = response.data;

       //redux
        return token;
    }
}
const auth = new Auth();
export default auth;