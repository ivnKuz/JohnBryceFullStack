import axios from "axios";
import LoremIpsum from "../models/loremIpsum";
import appConfig from "../utils/AppConfig";
import { ProductsAction, ProductsActionType, productsStore } from "../redux/ProductsState";

class Products {

    public async loremIpsum(): Promise<LoremIpsum[]>{

  
    const response = await axios.get<LoremIpsum[]>(appConfig.loremIpsumUrl);

        //extract the data from response
        const loremIpsums = response.data;
       

        return loremIpsums;
    }
    

//singleton
const loremIpsums = new LoremIpsum();
export default loremIpsums;