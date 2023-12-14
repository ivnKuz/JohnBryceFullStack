import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import productsService from "../../../services/Products";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../../../models/Product";
function ProductDetails(): JSX.Element {
    const params = useParams();
    const productId = Number(params.productId);

    const [product, setProduct] = useState<Product>();
    useEffect(()=>{

        productsService.getOne(productId)
        .then(productFromServer => setProduct(productFromServer))
        .catch(err => console.log(err.message))
    },[])
    console.log(product);
    console.log(productId);
    
    
    return (
        <div className="ProductDetails">
			<h2> product details</h2>
            <h3>Name: {product?.name}</h3>
            <h3>Stock: {product?.stock}</h3>
            <h3>Price: {product?.price?.toFixed(2)}</h3>

            <img src={product?.imageUrl} alt="" />
            <br />
            <NavLink to='/products'>Back</NavLink>
            <span> | </span>
            <NavLink to='#'>update</NavLink>
            <span> | </span>
            <NavLink to='#'>Delete</NavLink>
        </div>
    );
}

export default ProductDetails;
