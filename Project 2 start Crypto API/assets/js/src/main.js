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
import reduceCoinsPop from './reducers/coinsPop.js';
const cache = Cache.getInstance();
const checkedArr = [];
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
function getCoins() {
    return __awaiter(this, void 0, void 0, function* () {
        // const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        // const response = await fetch('coins.json');
        // const coins: Coin[] = await response.json();
        // const cacheResponse = await cache.getData('https://api.coingecko.com/api/v3/coins/list');
        const cacheResponse = yield cache.getData('coins.json');
        const coins = (cacheResponse);
        console.log(coins); // DELETE LOG
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
        //rendering coin data for button more-info
        if (e.target instanceof HTMLElement) {
            const element = e.target;
            if (element.id.startsWith('more-info-')) {
                const coinId = element.id.substring('more-info-'.length);
                const coinData = yield getCoinData(coinId);
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
            const element = e.target;
            //adds checkbox ids to modal, and creates html for them in coinsPop reducer
            checkCheckedCoins(allCheckboxes);
            //delete unchecked from arr by value
            if (element.id.startsWith('flexSwitchCheckChecked-')) {
                console.log('here');
                const coinId = element.id.substring('flexSwitchCheckChecked-'.length);
                if (!element.checked && checkedArr[checkedArr.indexOf(coinId)] === coinId) {
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
                if (element.checked && checkedArr.length <= 4) {
                    checkedArr.push(coinId);
                }
            }
        }
        console.log(checkedArr); // DELETE LOG
    });
}
//______________BY ID PULL THE ELEMENTS FROM THE QUERY SELECTOR ALL_____________
//make sure you cant select more than 5
function checkCheckedCoins(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const popUpList = [];
        const coinSymbols = [];
        // showing what was selected in a popup modal
        // for (let element of path) {
        for (let coinId of checkedArr) {
            const coinData = yield getCoinData(coinId);
            popUpList.push(coinData);
            coinSymbols.push(coinData.symbol.toUpperCase());
        }
        renderModal(popUpList);
        //adding onclick on every checkbox by id saved in array of ids. 
        //By unchecking the checkbox deleting id and a coinData from both arrays, then re-rendering the modal.
        checkedArr.forEach(coinId => {
            document.querySelector(`#flexSwitchCheck-${coinId}`).addEventListener('click', (e) => {
                let index = checkedArr.indexOf(coinId);
                if (index !== -1) {
                    checkedArr.splice(index, 1);
                    popUpList.splice(index, 1);
                }
                document.querySelector(`#flexSwitchCheckChecked-${coinId}`).checked = false;
                myModal.hide();
                renderModal(popUpList);
            });
        });
        //btn close modal
        document.getElementById('closeModal--btn').addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            //for the future idk what to do here, maybe delete after
        }));
        console.log(popUpList);
        // charts.getChosenCoinsData(coinSymbols)
    });
}
function renderModal(popUpList) {
    const html = reduceCoinsPop(popUpList);
    document.getElementById('modal-body').innerHTML = html;
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    // init
    document.getElementById('coins-container').addEventListener('click', coinsContainerClicked);
    console.log('TYPESCRIPT IS GARBAGE');
    console.log('TYPESCRIPT IS SHITFUC');
    // get data
    const coins = yield getCoins();
    // prepare data
    // cut list to 100 coins
    const shortList = coins.slice(0, 100);
    console.log(shortList); // DELETE LOG
    // reduce to create the HTML string of the cards
    // display
    const html = reduceCoins(shortList);
    document.getElementById('coins-container').innerHTML = html;
    // SEARCH INPUT
    document.getElementById('searchField').addEventListener('input', (e) => {
        //finding all card divs by title which is card.name in reducer
        const html = reduceCoins(coins);
        document.getElementById('coins-container').innerHTML = html;
        const allCheckboxes = document.querySelectorAll('.cardDIv');
        const value = e.target.value.toLowerCase();
        for (let cardElem of allCheckboxes) {
            const title = cardElem.querySelector('.card-title').textContent;
            const symbol = cardElem.querySelector('.card-text').textContent;
            const isVisible = title.toLowerCase().includes(value) || symbol.toLowerCase().includes(value);
            cardElem.classList.toggle('hide', !isVisible);
        }
        if (value === '') {
            const html = reduceCoins(shortList);
            document.getElementById('coins-container').innerHTML = html;
        }
    });
}))();
