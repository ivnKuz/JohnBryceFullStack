
import CoinData from './interfaces/coin-data.js';
import Coin from './interfaces/coin.js';
import reduceCoins from './reducers/coins.js';
import Cache from './Cache.js';
import reduceCoinsPop from './reducers/coinsPop.js';
const cache = Cache.getInstance();
declare const bootstrap: any;
const checkedArr: string[] = [];
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))


async function getCoins(): Promise<Coin[]> {
    // const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    // const response = await fetch('coins.json');
    // const coins: Coin[] = await response.json();
    // const cacheResponse = await cache.getData('https://api.coingecko.com/api/v3/coins/list');
    const cacheResponse = await cache.getData('coins.json');
    const coins: Coin[] = (cacheResponse) as Coin[]
    console.log(coins)// DELETE LOG

    return coins;
}


async function getCoinData(coinId: string): Promise<CoinData> {
    const cacheResponse = await cache.getData(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    //calling for coin-data interface to preview the things we want
    const coinData: CoinData = (cacheResponse) as CoinData
    return coinData;
}

async function coinsContainerClicked(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
        const element = e.target as HTMLElement;
        if (element.id.startsWith('more-info-')) {
            const coinId = element.id.substring('more-info-'.length);
            const coinData = await getCoinData(coinId);
            console.log(coinData); // DELETE LOG
            document.getElementById(`data-container-${coinId}`).innerHTML = `
                <img src="${coinData.image.thumb}"/> <br>
                usd: ${coinData.market_data.current_price.usd}$<br>
                eur: ${coinData.market_data.current_price.eur}€<br>
                ils: ${coinData.market_data.current_price.ils}₪
            `;
        }
    }

    const allCheckboxes = document.querySelectorAll('.form-check-input');
    //had to create another instance cuz input element
    if (e.target instanceof HTMLInputElement) {
        const element = e.target as HTMLInputElement;
         //adds checkbox ids to modal, and creates html for them in coinsPop reducer
         checkCheckedCoins(allCheckboxes);
         //delete unchecked from arr by value
        if (element.id.startsWith('flexSwitchCheckChecked-')) {
            console.log('here');
            
            const coinId = element.id.substring('flexSwitchCheckChecked-'.length);
            if(!element.checked && checkedArr[checkedArr.indexOf(coinId)] === coinId){
                let index = checkedArr.indexOf(coinId);
                 if (index !== -1) {
                    checkedArr.splice(index, 1);
                }
            }

            console.log(checkedArr); // DELETE LOG

            if (checkedArr.length > 4) {
            // show pop up when trying to select more than 5 and making sure you cant check next checkbox
            myModal.show();
            element.checked = false;
            } 
            if(element.checked && checkedArr.length <= 4){
                checkedArr.push(coinId)  
            }
       
    }
   
        
    }

    console.log(checkedArr);// DELETE LOG

}
//______________BY ID PULL THE ELEMENTS FROM THE QUERY SELECTOR ALL_____________
//make sure you cant select more than 5
async function checkCheckedCoins(path: NodeListOf<Element>) {
   
    const popUpList = [];

    // showing what was selected in a popup modal
    // for (let element of path) {
        for (let coinId of checkedArr) {
            const coinData = await getCoinData(coinId);
            popUpList.push(coinData);
        }
        
    console.log(popUpList);// DELETE LOG
    const html = reduceCoinsPop(popUpList);
    document.getElementById('modal-body').innerHTML = html;
    //adding onclick on every checkbox
   checkedArr.forEach(coinId => {
        document.querySelector(`#flexSwitchCheck-${coinId}`).addEventListener('click', (e)=>{
            let index = checkedArr.indexOf(coinId);
                 if (index !== -1) {
                    checkedArr.splice(index, 1);
                }
            (document.querySelector(`#flexSwitchCheckChecked-${coinId}`) as HTMLInputElement).checked = false;
            myModal.hide()
        })
    })
    //btn close modal
    document.getElementById('closeModal--btn').addEventListener('click', async () => {
      //for the future idk what to do here, maybe delete after
    });
    console.log(checkedArr);

}




(async () => {
    // init
    document.getElementById('coins-container').addEventListener('click', coinsContainerClicked);

    // get data
    const coins = await getCoins();

    // prepare data
    // cut list to 100 coins
    const shortList = coins.slice(0, 100);


    console.log(shortList);// DELETE LOG
    // reduce to create the HTML string of the cards
    // display
    const html = reduceCoins(shortList);
    document.getElementById('coins-container').innerHTML = html;
    // SEARCH INPUT
    document.getElementById('searchField').addEventListener('input', (e)=>{
        //finding all card divs by title which is card.name in reducer
        const allCheckboxes = document.querySelectorAll('.cardDIv');
        const value = (e.target as HTMLInputElement).value.toLowerCase();
            for(let cardElem of allCheckboxes){
            const title = cardElem.querySelector('.card-title').textContent;
            const isVisible = title.toLowerCase().includes(value) || title.toLowerCase().includes(value);
            cardElem.classList.toggle('hide', !isVisible);
            }
        }
        
    );
    

})();


