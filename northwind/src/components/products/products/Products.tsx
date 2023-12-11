import Product from "../../../models/Product";
import productsService from "../../../services/Products";
import { useEffect, useState } from "react";
import "./Products.css";
import useTitle from "../../../utils/useTitle";

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
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>stock</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
		            	{products.map(product => <tr  key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price!.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td><img src={product.imageUrl} alt="" /></td>
                            </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default Products;
