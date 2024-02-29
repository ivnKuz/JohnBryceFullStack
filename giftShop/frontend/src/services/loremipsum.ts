import axios from "axios";
import loremIpsumModel from "../models/loremIpsum";
import appConfig from "../utils/AppConfig";

class LoremIpsum {

    public async loremIpsum(): Promise<loremIpsumModel[]>{

  
    const response = await axios.get<loremIpsumModel[]>(appConfig.loremIpsumUrl);

        //extract the data from response
        const loremIpsums = response.data;
       

        return loremIpsums;
    }
}
    

//singleton
const loremIpsums = new LoremIpsum();
export default loremIpsums;