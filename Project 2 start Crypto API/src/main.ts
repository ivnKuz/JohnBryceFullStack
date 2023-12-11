import CoinData from './interfaces/coin-data.js';
import Coin from './interfaces/coin.js';
import reduceCoins from './reducers/coins.js';
import Cache from './Cache.js';
import reduceCoinsPop from './reducers/coinsPop.js';
const cache = Cache.getInstance();


async function getCoins(): Promise<Coin[]> {
    // const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    // const response = await fetch('coins.json');
    // const coins: Coin[] = await response.json();
    const cacheResponse = await cache.getData('https://api.coingecko.com/api/v3/coins/list');
    // const cacheResponse = await cache.getData('coins.json');
    const coins: Coin[] = (cacheResponse) as Coin[]
    console.log(coins)

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





    checkCheckedCoins(allCheckboxes);

    //array to hold up to 5 picked elements
    //button cancel 

}

//make sure you cant select more than 5
async function checkCheckedCoins(path: NodeListOf<Element>) {

    const checkedArr: HTMLInputElement[] = [];
    const popUpList = [];
    for (let check of path as NodeList) {
        let convertCheck = check as HTMLInputElement;

        if (checkedArr.length > 4) {
            convertCheck.checked = false;
            // show pop up when trying to select more than 5, adding toggle modal bs attribute to all other unselected checkboxes
            for (let check2 of path as NodeList) {
                let convertCheck2 = check2 as HTMLInputElement;
                if (!convertCheck2.checked) {

                    convertCheck2.setAttribute('data-bs-toggle', 'modal');
                    convertCheck2.setAttribute('data-bs-target', '#exampleModal');
                }
            }

        } else {
            convertCheck.removeAttribute('data-bs-toggle');
            convertCheck.removeAttribute('data-bs-target');
        }
        if (convertCheck.checked) {
            checkedArr.push(convertCheck);
        }


    }
    //showing what was selected in a popup modal
    for (let element of checkedArr) {
        const coinId = element.id.substring('flexSwitchCheckChecked-'.length);
        const coinData = await getCoinData(coinId);
        popUpList.push(coinData);
        console.log(popUpList);
    }
    const html = reduceCoinsPop(popUpList);
    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('closeModal--btn').addEventListener('click', async () => {
        // remove last element in array 



        for (let check of path as NodeList) {
            let convertCheck = check as HTMLInputElement;

            if (!convertCheck.checked) {

                convertCheck.setAttribute('data-bs-toggle', 'modal');
                convertCheck.setAttribute('data-bs-target', '#exampleModal');
            }
        }
        // uncheck all the checkboxes
        // for (let checkbox of path) {
        //     const boxElem = checkbox as HTMLInputElement;
        //     for (let i = 0; i < checkedArr.length; i++) {
        //         if (boxElem == checkedArr[i]) {
        //             boxElem.checked = true;
        //             break;
        //         } else {
        //             boxElem.checked = false;
        //         }
        //     }

        // }

        //check only those saved in in array
        // for (let elem of checkedArr) {
        //     elem.checked = true;
        // }
        console.log(checkedArr);


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
    // reduce to create the HTML string of the cards
    const html = reduceCoins(shortList);
    document.getElementById('coins-container').innerHTML = html;
    // display

})();
