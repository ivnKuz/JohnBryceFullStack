import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../home/home/Home";

import Page404 from "../page404/Page404";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to='/home' /> }/>
            
            <Route path="/*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
