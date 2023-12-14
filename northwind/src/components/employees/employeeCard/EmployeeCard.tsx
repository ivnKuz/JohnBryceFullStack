
import Employee from "../../../models/Employee";
import "./EmployeeCard.css";
interface EmployeeCardProps{
    employee: Employee;
}
function EmployeeCard(props: EmployeeCardProps): JSX.Element {
    return (
        <div className="EmployeeCard">
			<td>{props.employee.firstName}</td>
                            <td>{props.employee.lastName}</td>
                            <td>{props.employee.title}</td>
                            <td>{props.employee.country}</td>
                            <td>{props.employee.city}</td>
                            <td>{props.employee.birthDate}</td>
                            <td><img src={props.employee.imageUrl} alt="" /></td>
        </div>
    );
}

export default EmployeeCard;
