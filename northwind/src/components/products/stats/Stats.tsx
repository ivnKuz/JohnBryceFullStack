import "./Stats.css";
import { useEffect, useState } from "react";
import productsService from "../../../services/Products";
import notify from "../../../services/Notify";
import { ProductsState, productsStore } from "../../../redux/ProductsState";
function Stats(): JSX.Element {
    const [totalProducts, setTotalProducts] = useState<number>()
    const [totalPrice, setTotalPrice] = useState<number>()
    const [totalStock, setTotalStock] = useState<number>()

    useEffect(()=>{
        productsService.getAll()
        .then(products => {
            setTotalProducts(products.length)
            setTotalPrice(products.reduce((acc,curr) => acc + (curr.price || 0), 0))
            setTotalStock(products.reduce((acc,curr) => acc + (curr.stock || 0), 0))
        })
        .catch(err => notify.error(err));
      const unsubscribeStats = productsStore.subscribe(()=>{
            setTotalProducts(productsStore.getState().products.length)
            setTotalPrice(productsStore.getState().products.reduce((acc,curr) => acc + (curr.price || 0), 0))
            setTotalStock(productsStore.getState().products.reduce((acc,curr) => acc + (curr.stock || 0), 0))
        });
        //Sort of OnDestroy in angular cuz UseEffect startts when component is loaded so return will be when its closed
        return unsubscribeStats;
        
    }, [])


    return (
        <div className="Stats">
			Total Products: {totalProducts} | Total Price: {totalPrice} | Total Stock: {totalStock}
        </div>
    );
}

export default Stats;
