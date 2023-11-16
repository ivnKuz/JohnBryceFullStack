import rest from "../api/rest.js";
import HttpMethods from "../enums/http-methods.js";
export default async function Productslistener(e: MouseEvent){
        const targetId = e.target as HTMLElement;
        if(targetId.id.startsWith('delete-')){
            const productId = targetId.id.substring('delete-'.length);
            const response = await rest(HttpMethods.DELETE, `https://dummyjson.com/products/${productId}`)
            console.log(response);
            document.getElementById(`tr-${productId}`).remove()
            return;
        }
        if(targetId.id.startsWith('update-')){
            const productId = targetId.id.substring('update-'.length);
            const newDescription = prompt('please enter new description')
            const data = {
                description: newDescription
            }
            const response = await rest(HttpMethods.PATCH, `https://dummyjson.com/products/${productId}`, )
            console.log(response);
            
            document.getElementById(`tr-${productId}`).children[2].textContent = `${newDescription}`
            
            return;
        }
        
        
        //REST request to delete from server
        
        
    
}  