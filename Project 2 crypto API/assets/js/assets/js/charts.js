var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// window.onload = function() {
function getChosenCoinsData(chosenCoins = ['BTC, ETH, ZCN']) {
    return __awaiter(this, void 0, void 0, function* () {
        // `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ZOC,ETH,ZCN,BTC&tsyms=USD`
        const cryptoAPILink = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${chosenCoins.join('').replace(/ /g, '')}&tsyms=USD`;
        let coinsArr = [];
        console.log(chosenCoins.join().replace(/ /g, ''));
        const request = yield fetch(cryptoAPILink);
        const data = yield request.json();
        for (const [key, value] of Object.entries(data)) {
            coinsArr.push({ key: value });
        }
        ;
        return coinsArr;
    });
}
// getChosenCoinsData();
var dataPoints = [];
var options = {
    theme: "Light",
    title: {
        text: "Live Data"
    },
    data: [{
            type: "line",
            dataPoints: []
        }, {
            type: "line",
            dataPoints: []
        }, {
            type: "line",
            dataPoints: []
        }, {
            type: "line",
            dataPoints: []
        }]
};
$("#chartContainer").CanvasJSChart(options);
updateData();
// Initial Values
var xValue = 20000;
var yValue = 10;
var newDataCount = 6;
function addData(data) {
    if (newDataCount != 1) {
        $.each(data, function (key, value) {
            dataPoints.push({ x: value[0], y: parseInt(value[1]) });
            xValue++;
            yValue = parseInt(value[1]);
        });
    }
    else {
        //dataPoints.shift();
        dataPoints.push({ x: data[0][0], y: parseInt(data[0][1]) });
        xValue++;
        yValue = parseInt(data[0][1]);
    }
    newDataCount = 1;
    $("#chartContainer").CanvasJSChart().render();
}
function updateData() {
    return __awaiter(this, void 0, void 0, function* () {
        // $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart="+xValue+"&ystart="+yValue+"&length="+newDataCount+"&type=json", addData);
        // var length = options.data[0].dataPoints.length;
        // options.title.text = "Last DataPoint Updated";
        // 15 - Math.random() * 10
        const btc = yield getChosenCoinsData();
        console.log(btc);
        // const time = new Date().toLocaleTimeString()
        // console.log(time.slice(0,time.length-3));
        btc.forEach((cryptoCoin, index) => {
            console.log(Object.values(cryptoCoin.key)[0]);
            console.log(index);
            console.log(Object.keys(cryptoCoin.key)[0]);
            options.data[index].dataPoints.push({ y: Object.values(cryptoCoin.key)[0] });
        });
        // console.log(options.data[0].dataPoints[length-1].y);
        $("#chartContainer").CanvasJSChart().render();
    });
}
// setInterval(updateData, 1500);	
// }
export default getChosenCoinsData();
