import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";
import { useEffect, useState } from "react";
import productService from "../../../services/Products";
import Product from "../../../models/Product";
import { useForm } from "react-hook-form";
import notify from "../../../services/Notify";

function EditProduct(): JSX.Element {
    const params = useParams();
    const productId = Number(params.productId);
    const {register, handleSubmit, setValue} = useForm<Product>();
    const navigate = useNavigate()
    useEffect(()=>{
        productService.getOne(productId)
        .then(productFromServer => {
            setValue('name', productFromServer?.name);
            setValue('price', productFromServer?.price);
            setValue('stock', productFromServer?.stock);
        })
        .catch(err => console.log(err.message))
    },[])
    async function submitProductData(product: Product){
        console.log(product);
        try{
            //to turn File to FileList we gotta first make it unknown then FileList. lmao typescript am I right
            product.image = (product.image as unknown as FileList)[0];
            product.id = productId;
            const updatedProduct = await productService.editProduct(product);
            notify.success(`Updated product ${updatedProduct.name} successfuly.`);
            // navigate(`/product/details/${updatedProduct.id}`)
            navigate(`/products`)
            
        }catch(err){
            notify.error(err)
        }
    }
    return (
        <div className="EditProduct">
				<h2>Edit Product</h2>
            <form onSubmit={handleSubmit(submitProductData)}>
                <label>Name:</label>
                <input type="text" {...register('name')} />

                <label>Price:</label>
                <input type="number" step="0.01" {...register('price')}/>

                <label>Stock:</label>
                <input type="number" {...register("stock")}/>

                <label>Image:</label>
                <input type="file" accept="image/*" {...register("image")}/>

                <button>Edit</button>
            </form>
        </div>
    );
}

export default EditProduct;
