var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import reduceCoins from './reducers/coins.js';
import Cache from './Cache.js';
const cache = Cache.getInstance();
function getCoins() {
    return __awaiter(this, void 0, void 0, function* () {
        // const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        // const response = await fetch('coins.json');
        // const coins: Coin[] = await response.json();
        // const cacheResponse = await cache.getData('https://api.coingecko.com/api/v3/coins/list');
        const cacheResponse = yield cache.getData('coins.json');
        const coins = (cacheResponse);
        console.log(coins);
        return coins;
    });
}
function getCoinData(coinId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheResponse = yield cache.getData(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        //calling for coin-data interface to preview the things we want
        const coinData = (cacheResponse);
        return coinData;
    });
}
function coinsContainerClicked(e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (e.target instanceof HTMLElement) {
            const element = e.target;
            if (element.id.startsWith('more-info-')) {
                const coinId = element.id.substring('more-info-'.length);
                const coinData = yield getCoinData(coinId);
                console.log(coinData);
                document.getElementById(`data-container-${coinId}`).innerHTML = `
                <img src="${coinData.image.thumb}"/> <br>
                usd: ${coinData.market_data.current_price.usd}$<br>
                eur: ${coinData.market_data.current_price.eur}€<br>
                ils: ${coinData.market_data.current_price.ils}₪
            `;
            }
        }
        const allCheckboxes = document.querySelectorAll('.form-check-input');
        let checkedArr = [];
        for (let check of allCheckboxes) {
            let convertCheck = check;
            if (checkedArr.length > 4) {
                // show pop up when trying to select more than 5, adding toggle modal bs attribute to all other unselected checkboxes
                if (!convertCheck.checked) {
                    convertCheck.setAttribute('data-bs-toggle', 'modal');
                    convertCheck.setAttribute('data-bs-target', '#exampleModal');
                }
            }
            else {
                convertCheck.removeAttribute('data-bs-toggle');
                convertCheck.removeAttribute('data-bs-target');
            }
            if (convertCheck.checked) {
                checkedArr.push(convertCheck);
            }
        }
        checkCheckedCoins(allCheckboxes, checkedArr);
        //array to hold up to 5 picked elements
        //button cancel 
    });
}
//make sure you cant select more than 5
function checkCheckedCoins(path, checkedArr) {
    document.getElementById('closeModal--btn').addEventListener('click', () => {
        // remove last element in array 
        checkedArr.pop();
        // uncheck all the checkboxes
        for (let checkbox of path) {
            const boxElem = checkbox;
            boxElem.checked = false;
        }
        //check only those saved in in array
        for (let elem of checkedArr) {
            elem.checked = true;
        }
        console.log(checkedArr);
    });
    console.log(checkedArr);
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    // init
    document.getElementById('coins-container').addEventListener('click', coinsContainerClicked);
    // get data
    const coins = yield getCoins();
    // prepare data
    // cut list to 100 coins
    const shortList = coins.slice(0, 100);
    // reduce to create the HTML string of the cards
    const html = reduceCoins(shortList);
    document.getElementById('coins-container').innerHTML = html;
    // display
}))();
