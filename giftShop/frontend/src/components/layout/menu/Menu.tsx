import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";
function Menu(): JSX.Element {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    return (
        <div className="Menu">
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/gifts'>Gifts</NavLink>
            <NavLink to='/gifts/add'>add gifts</NavLink>
            {isUserLoggedIn && <NavLink to='/categories'>Categories</NavLink>}
            <NavLink to='/about'>About</NavLink>
        </div>
    );
}

export default Menu;
