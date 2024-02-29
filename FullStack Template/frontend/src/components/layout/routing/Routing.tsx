import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../home/home/Home";

import Page404 from "../page404/Page404";
import loremipsum from "../../employees/Employees/Employees";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to='/home' />} />
            
            <Route path="/products/edit/:productId" element={<EditProduct />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/categories" element={<CategoriesList />}/>
            
            <Route path="/*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
