import Product from "../../../models/Product";
import productsService from "../../../services/Products";
import { useEffect, useState } from "react";
import "./Products.css";
import useTitle from "../../../utils/useTitle";
import ProductCard from "../productCard/ProductCard";
import { NavLink } from "react-router-dom";
import Spinner from "../../common/spinner/Spinner";
import Stats from "../stats/Stats";
import AddProduct from "../addProduct/AddProduct";
import ProductsList from "../list/Products";

function Products(): JSX.Element {
    useTitle('Northwind Products')
    const [products, setProducts] = useState<Product[]>([])

    
    console.log(products);
    
    useEffect(()=>{
        //can use iffie to make function async
        // const productsFromServer =  productsService.getAll();
        // setProducts(productsFromServer);

        productsService.getAll().then(productsFromServer => setProducts(productsFromServer)).catch()
    },[]);
    console.log(products);
    return (
        <div className="Products">
            <div>
            <br />
                            <br />
                            <Stats />
                            <br />
                            <ProductsList/>
                     
            </div>
            <aside>
                <AddProduct />
            </aside>
                        
        </div>
    );
}

export default Products;
