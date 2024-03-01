import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import "./Gifts.css";
import audiencesService from "../../../services/Audiences";
import Audience from "../../../models/Audience";
import { Notyf } from "notyf";
import notify from "../../../services/Notify";
import Gift from "../../../models/Gift";
import giftsService from "../../../services/Gifts";

function Gifts(): JSX.Element {

    const [audiences, setAudience] = useState<Audience[]>([]);
    const [gifts, setGifts] = useState<Gift[]>([]);
    useEffect(()=> {
        audiencesService.getAll()
        .then(setAudience)
        .catch(notify.error)
    }, [])

    async function displayGifts(args: ChangeEvent<HTMLSelectElement>){
    
        try {
            const audienceId = +args.target.value;
            const gifts = await giftsService.getAll(audienceId);
            setGifts(gifts);
        } catch (error) {
            notify.error(error)
        }
    }

    async function deleteGift(id: number | undefined){
        if(!id) return;
        try {
            const gifts = await giftsService.remove(id);
            const refreshGifts = await giftsService.getAll(currentAudience)
            setGifts(gifts)
        } catch (error) {
            notify.error(error)
        }
    }
    
    return (
        <div className="Gifts">
			<select  onChange={displayGifts}>
                 <option value="x" disabled >Select your option</option>
                 {audiences.map(audience => <option key={audience.id} value={audience.id}>{audience.name}</option>)}
            </select>


            <br />
            <br />
            <button  ></button>
            <table className="styled-table">
                <thead>
                    <tr className="active-row">
                        <th>name</th>
                        <th>description</th>
                        <th>discount</th>
                        <th>price</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {gifts.map(gift =><tr key={gift.id} className="active-row">
                        <td>{gift.name}</td>
                        <td>{gift.description}</td>
                        <td>{gift.discount}</td>
                        <td>{gift.price}</td>
                        <td><button onClick={() => deleteGift(gift.id)}>Delete</button></td>
                    </tr> )}
                </tbody>
            </table>
        </div>
    );
}

export default Gifts;
