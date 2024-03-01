import { useEffect, useState } from "react";
import audiencesService from "../../../services/Audiences";
import "./Add.css";
import Audience from "../../../models/Audience";
import notify from "../../../services/Notify";
import { useForm } from "react-hook-form";
import Gift from "../../../models/Gift";
import giftService from "../../../services/Gifts";
import { useNavigate } from "react-router-dom";

function Add(): JSX.Element {

    const [audiences, setAudience] = useState<Audience[]>([]);
    const {register, handleSubmit, formState} = useForm<Gift>();

    useEffect(()=> {
        audiencesService.getAll()
        .then(setAudience)
        .catch(notify.error)
    }, [])
    const navigate = useNavigate();
    async function addGift(gift: Gift) {
        try{
            const addedGift = await giftService.add(gift);
            notify.success(`added gift with id ${addedGift.id} and name ${addedGift.name} `)
            navigate('/gifts');
        }catch(err){
        notify.error(err)
        }
    }

    return (
        <div className="Add">
			<form onSubmit={handleSubmit(addGift)}>
            <select defaultValue='' {...register('audienceId')}>
                 <option value="" disabled >Select your option</option>
                 {audiences.map(audience => <option key={audience.id} value={audience.id}>{audience.name}</option>)}
            </select>

                <input type="text" placeholder="name" {...register('name', {
                    required: {
                        value: true,
                        message: 'name is required'
                    }
                })}/>
                <span className="error">{formState.errors.name?.message}</span>
                <input type="text" placeholder="description"  {...register('description')}/>
                <input type="number" placeholder="discount" {...register('discount')}/>
                <input type="number" placeholder="price" {...register('price')}/>
                <button>ADD</button>
            </form>
        </div>
    );
}

export default Add;
