import Product from "../../../models/Product";
import productsService from "../../../services/Products";
import { useEffect, useState } from "react";
import "./Products.css";
import useTitle from "../../../utils/useTitle";
import ProductCard from "../productCard/ProductCard";
import { NavLink } from "react-router-dom";
import Spinner from "../../common/spinner/Spinner";
import { productsStore } from "../../../redux/ProductsState";

function ProductsList(): JSX.Element {
    useTitle('Northwind Products')
    const [products, setProducts] = useState<Product[]>([])

    
    console.log(products);
    
    useEffect(()=>{
        //can use iffie to make function async
        // const productsFromServer =  productsService.getAll();
        // setProducts(productsFromServer);

        productsService.getAll().then(productsFromServer => setProducts(productsFromServer)).catch()
        const unsubscribeProducts = productsStore.subscribe(()=>{
            setProducts([...productsStore.getState().products])
        })
        return unsubscribeProducts;
    },[]);
    console.log(products);
    return (
        <div className="ProductsList">
               {products.length === 0 && <Spinner/>}
                    {products.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
    );
}

export default ProductsList;
