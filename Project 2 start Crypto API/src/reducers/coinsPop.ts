import Coin from "../interfaces/coin.js";

export default function reduceCoinsPop(coins: Coin[]): string {
    return coins.map(coin => `
        <div class="col-sm-6 col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${coin.name}</h5>
                    <p class="card-text">${coin.symbol}</p>
                   <div class="form-check form-switch">
                   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked-${coin.id}" >
                   </div>
                    
                </div>
            </div>
        </div>
    `).reduce((acc, curr) => acc + curr, '');
}