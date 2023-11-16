import Product from "./interfaces/product.js";
import reduceProducts from "./reducers/products.js";
import presentProductTable from "./ui/products.js";
import Productslistener from "./event-listeners/products-table.js";

//get data
(async()=>{
    document.getElementById('products-table-body').addEventListener('click', (e)=>{Productslistener(e)});

    const response = await fetch('https://dummyjson.com/products')
    const json = await response.json();
    const products: Product[] = json.products;
    // const {products} = await response.json();

    //prep data for presentation
    const productsHTML = reduceProducts(products);
    
    presentProductTable(productsHTML);
    
})()

//present data (UI)