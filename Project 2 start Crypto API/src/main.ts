import CoinData from './interfaces/coin-data.js';
import Coin from './interfaces/coin.js';
import reduceCoins from './reducers/coins.js';
import Cache from './Cache.js';
import reduceCoinsPop from './reducers/coinsPop.js';
import setLink from './charts.js';
const cache = Cache.getInstance();
declare const bootstrap: any;
//every checked coin ID stored here:
const checkedArr: string[] = [];
//creating new modal instance
const myModal = new bootstrap.Modal(document.getElementById('coinsModal'));

//get all the coins
async function getCoins(): Promise<Coin[]> {
    const cacheResponse = await cache.getData('https://api.coingecko.com/api/v3/coins/list');
    const coins: Coin[] = (cacheResponse) as Coin[]
    return coins;
}

//get a single coin by id(name, symbol)
async function getCoinData(coinId: string): Promise<CoinData> {
    const cacheResponse = await cache.getData(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    //calling for coin-data interface to preview the things we want
    const coinData: CoinData = (cacheResponse) as CoinData
    return coinData;
}

async function coinsContainerClicked(e: MouseEvent) {
    //rendering coin data for button more-info
    if (e.target instanceof HTMLElement) {
        const element = e.target as HTMLElement;
        if (element.id.startsWith('more-info-')) {
            const coinId = element.id.substring('more-info-'.length);
            const coinData = await getCoinData(coinId);
            document.getElementById(`data-container-${coinId}`).innerHTML = `
                <img src="${coinData.image.thumb}"/> <br>
                usd: ${coinData.market_data.current_price.usd}$<br>
                eur: ${coinData.market_data.current_price.eur}€<br>
                ils: ${coinData.market_data.current_price.ils}₪
            `;
        }
    }

    //had to create another instance cuz input element
    if (e.target instanceof HTMLInputElement) {
        const element = e.target as HTMLInputElement;
         //delete unchecked from arr by value
        if (element.id.startsWith('flexSwitchCheckChecked-')) {
            const coinId = element.id.substring('flexSwitchCheckChecked-'.length);
            if(!element.checked && checkedArr[checkedArr.indexOf(coinId)] === coinId){
                let index = checkedArr.indexOf(coinId);
                 if (index !== -1) {
                    checkedArr.splice(index, 1);
                }
            }
            // show pop up when trying to select more than 5 and making sure you cant check next checkbox
            if (checkedArr.length > 4) {
            myModal.show();
            element.checked = false;
            } 
            //just push ids(symbols) if checked the checkbox and arr length is less than 5
            if(element.checked && checkedArr.length <= 4) checkedArr.push(coinId);
            //checked coins go to pop up
            checkCheckedCoins();
    }
    }
}

async function checkCheckedCoins() {
    const popUpList = [];
    const coinSymbols = [];
    // showing what was selected in a popup modal
        for (let coinId of checkedArr) {
            const coinData = await getCoinData(coinId);
            popUpList.push(coinData);
            coinSymbols.push(coinData.symbol.toUpperCase())
        }
        //sending crypto symbols into the fetch link inside charts.js
        if(coinSymbols.length >= 1){
            setLink(coinSymbols);
        }
        
    renderModal(popUpList)
    //adding onclick on every checkbox by id saved in array of ids. 
    //By unchecking the checkbox deleting id and a coinData from both arrays, then re-rendering the modal.
   checkedArr.forEach(coinId => {
        document.querySelector(`#flexSwitchCheck-${coinId}`).addEventListener('click', (e)=>{
            let index = checkedArr.indexOf(coinId);
                 if (index !== -1) {
                    checkedArr.splice(index, 1);
                    popUpList.splice(index, 1);
                }
                //if exists on current rendered list of cards - uncheck
                if(document.querySelector(`#flexSwitchCheckChecked-${coinId}`)) (document.querySelector(`#flexSwitchCheckChecked-${coinId}`) as HTMLInputElement).checked = false;
            myModal.hide()
            renderModal(popUpList);
        })
    })
}
 //creating new html elements inside the modal container.
function renderModal(popUpList){
    const html = reduceCoinsPop(popUpList);
    document.getElementById('modal-body').innerHTML = html;
}


(async () => {
    // init
    document.getElementById('coins-container').addEventListener('click', coinsContainerClicked);
    // get data
    const coins = await getCoins();
    // cut list to 100 coins to appear on home screen.
    const shortList = coins.slice(0, 100);
    // display
    createCards(shortList);

    // SEARCH INPUT, searching by every letter just typed. Both title and symbol of coin is searched for.
    document.getElementById('searchField').addEventListener('input', (e)=>{
        //will search in all 11k coins and show only those you entered name or symbol in.
        createCards(coins)
        const allCheckboxes = document.querySelectorAll('.cardDIv');
        const value = (e.target as HTMLInputElement).value.toLowerCase();
            for(let cardElem of allCheckboxes){
            const title = cardElem.querySelector('.card-title').textContent;
            const symbol = cardElem.querySelector('.card-text').textContent;
            // made a search by title and a symbol. Can remove one at any time if needed.
            const isVisible = title.toLowerCase().includes(value) || symbol.toLowerCase().includes(value);
            cardElem.classList.toggle('hide', !isVisible);
            }
            //when you delete everything from the input or its empty, it will go back to the shorter 100 cards list
            if(value === '') createCards(shortList);
        }
    );
})();

//render cards
function createCards(list: Coin[]){
    const html = reduceCoins(list);
    document.getElementById('coins-container').innerHTML = html;
    //when it re-rendering the cards if search is used it renders all 11k, when search is empty it shows only 100, so this code
    //is preventing the checked cards from being unchecked and cause error cuz the card isnt rendered, so without if the .checked = true will cause error cuz no such element.
    checkedArr.forEach(coinId => {
        if(document.querySelector(`#flexSwitchCheckChecked-${coinId}`)) (document.querySelector(`#flexSwitchCheckChecked-${coinId}`) as HTMLInputElement).checked = true;
    })
}


