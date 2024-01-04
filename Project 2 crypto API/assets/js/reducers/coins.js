//creation of every Card for crypto coins
export default function reduceCoins(coins) {
    return coins.map(coin => `
        <div class="col-sm-6 col-md-3 cardDIv">
            <div class="card">
                <div class="card-body">
                   <div class="card__top-box">
                          <h5 class="card-title">${coin.name}</h5>
                          <div class="form-check form-switch ">
                          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked-${coin.id}" >
                          </div>
                   </div>
                    <p class="card-text">${coin.symbol}</p>
                    <a href="#" id="more-info-${coin.id}" class="btn btn-success" data-bs-toggle="collapse"
                        data-bs-target="#collapse-${coin.id}">More Info</a>
                    <div class="collapse" id="collapse-${coin.id}">
                        <div class="card card-body" id="data-container-${coin.id}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).reduce((acc, curr) => acc + curr, '');
}
