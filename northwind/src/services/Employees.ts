import axios from "axios";
import appConfig from "../utils/AppConfig";
import Employee from "../models/Employee";

class Employees {

    public async getAll(): Promise<Employee[]>{ 

        const response = await axios.get<Employee[]>(appConfig.emplyeesUrl);

        const employees = response.data;

        return employees;
    }
}

//singleton
const employees = new Employees();
export default employees;