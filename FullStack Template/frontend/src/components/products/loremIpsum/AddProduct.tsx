import { useForm } from "react-hook-form";
import "./AddProduct.css";
import Product from "../../../models/loremIpsum";
import productService from "../../../services/loremipsum";
import { useNavigate } from "react-router-dom";
import notify from "../../../services/Notify";

function AddProduct(): JSX.Element {
    //handle submit kniows how to send parameter to submitProductData() because we assigned Product to use form
    const {register, handleSubmit} = useForm<Product>();
    const navigate = useNavigate();
    async function submitProductData(product: Product){
        console.log(product);
        try{
            //to turn File to FileList we gotta first make it unknown then FileList. lmao typescript am I right
            product.image = (product.image as unknown as FileList)[0];
            const newProduct = await productService.addProduct(product);
            notify.success(`new product ${newProduct.name} was successfuly added.`);
            navigate('/products')
            
        }catch(err){
            notify.error(err)
        }
    }
    return (
        <div className="AddProduct">
			<h2>Add Product</h2>
            <form onSubmit={handleSubmit(submitProductData)}>
                <label>Name:</label>
                <input type="text" {...register('name')} />

                <label>Price:</label>
                <input type="number" step="0.01" {...register('price')}/>

                <label>Stock:</label>
                <input type="number" {...register("stock")}/>

                <label>Image:</label>
                <input type="file" accept="image/*" {...register("image")}/>

                <button>add</button>
            </form>
        </div>
    );
}

export default AddProduct;
