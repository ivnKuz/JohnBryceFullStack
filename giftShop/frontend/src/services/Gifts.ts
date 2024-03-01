import axios from "axios";
import Gift from "../models/Gift";
import appConfig from "../utils/AppConfig";

class Gifts {

    public async getAll(audienceId: number): Promise<Gift[]>{

  
    const response = await axios.get<Gift[]>(`${appConfig.giftsUrl}/ ${audienceId}`);

        //extract the data from response
        const gifts = response.data;
       

        return gifts;
    }

    public async add(gift: Gift): Promise<Gift>{
        const response = await axios.post<Gift>(appConfig.addGiftsUrl, gift);
        const addedGift = response.data;
        return addedGift;

    }
    public async remove(id: number): Promise<void>{
        await axios.delete<Gift>(`${appConfig.addGiftsUrl}/${id}`);

    }
}

    

//singleton
const gifts = new Gifts();
export default gifts;