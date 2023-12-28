import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../home/home/Home";
import Products from "../../products/products/Products";
import About from "../../about/about/About";
import Page404 from "../page404/Page404";
import Employees from "../../employees/Employees/Employees";
import ProductDetails from "../../products/productDetails/ProductDetails";
import AddProduct from "../../products/addProduct/AddProduct";
import EditProduct from "../../products/editProduct/EditProduct";
import Signup from "../../auth/signup/Signup";
import Login from "../../auth/login/Login";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to='/home' />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/details/:productId" element={<ProductDetails />} />
            <Route path="/products/new" element={<AddProduct />}/>
            <Route path="/products/edit/:productId" element={<EditProduct />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            
            <Route path="/*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
