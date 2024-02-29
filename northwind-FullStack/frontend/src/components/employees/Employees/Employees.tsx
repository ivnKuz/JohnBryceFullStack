import { useEffect, useState } from "react";
import "./Employees.css";
import Employee from "../../../models/Employee";
import EmployeeService from '../../../services/Employees'
import useTitle from "../../../utils/useTitle";
import EmployeeCard from "../employeeCard/EmployeeCard";
function Employees(): JSX.Element {
    useTitle('Northwind Employees')
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(()=> 
    {
        EmployeeService.getAll()
        .then(employeesFromApi => setEmployees(employeesFromApi))
        .catch(err => console.error('error', err))
    },[])


    return (
       
        <div className="Employees">
		            	{employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
        </div>
    );
}

export default Employees;
