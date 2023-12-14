export default function reduceCoinsPop(coins) {
    return coins.map(coin => `
        <div class="col-sm-8">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${coin.name}</h5>
                    <p class="card-text">${coin.symbol}</p>
                   <div class="form-check form-switch">
                   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked-${coin.id}" checked='true' >
                   </div>
                    
                </div>
            </div>
        </div>
    `).reduce((acc, curr) => acc + curr, '');
}
