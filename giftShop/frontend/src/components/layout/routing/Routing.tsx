import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../home/home/Home";

import Page404 from "../page404/Page404";
import Gifts from "../../gifts/gifts/Gifts";
import Add from "../../gifts/add/Add";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to='/home' /> }/>
            <Route path="/gifts" element={<Gifts/> }/>
            <Route path="gifts/add" element={<Add />} />
            <Route path="/*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
