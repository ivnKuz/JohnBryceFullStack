import { NavLink } from "react-router-dom";
import "./Menu.css";
function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to='/home'>Home</NavLink>

            <NavLink to='/employees'>Employees</NavLink>
            <NavLink to='/products'>Products</NavLink>
            <NavLink to='/categories'>Categories</NavLink>
            <NavLink to='/about'>About</NavLink>
        </div>
    );
}

export default Menu;
