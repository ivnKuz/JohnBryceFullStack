import { useEffect, useState } from "react";
import "./Employees.css";
import Employee from "../../../models/Employee";
import EmployeeService from '../../../services/Employees'
function Employees(): JSX.Element {
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(()=> 
    {
        EmployeeService.getAll()
        .then(employeesFromApi => setEmployees(employeesFromApi))
        .catch(err => console.error('error', err))
    },[])


    return (
       
        <div className="Employees">
			 <table>
                <thead>
                    <tr>
                        <th>first name</th>
                        <th>last name</th>
                        <th>title </th>
                        <th>country</th>
                        <th>city</th>
                        <th>birth date</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
		            	{employees.map(employee => <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.title}</td>
                            <td>{employee.country}</td>
                            <td>{employee.city}</td>
                            <td>{employee.birthDate}</td>
                            <td><img src={employee.imageUrl} alt="" /></td>
                            </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default Employees;
