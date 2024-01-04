//had to put em here to use globaly in this file. One to use ready to use link and second for interval to clear it.
let cryptoAPILink = '';
let myInterval;
// passing the chosen coin symbols into link
export default function setLink(chosenCoins){
    if(chosenCoins) cryptoAPILink = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${chosenCoins.join(',').replace(/ /g,'')}&tsyms=USD`;
}
//getting the data we got from cryptocompare API and passing it into the updateData() function in form of objects arr,
//Key there being crypto symbol destructured and value is its value in USD currency.
async function getChosenCoinsData(){
    let coinsArr = [];
    if(!cryptoAPILink) return;
    const request = await fetch(cryptoAPILink)
    const data = await request.json()
    for(const [key, value] of Object.entries(data)){
        coinsArr.push({value: value, key: key})
    };
    return coinsArr;
}
    //options for our jquery chart canvas, made 5 cuz we can show max 5 cards. 
    var options = {
        theme: "dark2",
        title: {
            text: ""
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "",
            dataPoints: []
        },{
            type: "line",
            showInLegend: true,
            name: "",
            dataPoints: []
        },{
            type: "line",
            showInLegend: true,
            name: "",
            dataPoints: []
        },{
            type: "line",
            showInLegend: true,
            name: "",
            dataPoints: []
        },{
            type: "line",
            showInLegend: true,
            name: "",
            dataPoints: []
        }]
    };
    //initializing the chart
$("#chartContainer").CanvasJSChart(options);


//this function is setting all the data we got from cryptocompare API and passing it into the chart options
     async function updateData() {
        const coinsData = await getChosenCoinsData();
        coinsData.forEach((cryptoCoin, index) => {
            //pushing the USD currency numbers onto y axis
            options.data[index].dataPoints.push( {y: Object.values(cryptoCoin.value)[0]})
            //getting the crypto symbol to show its name below the chart and its color.
            options.data[index].name = cryptoCoin.key;
        });
        $("#chartContainer").CanvasJSChart().render();  
    }
    //just setting a title for a chart, of what coins are converted into USD
    async function makeAtitle(){
    options.title.text = '';
    const coinstData = await getChosenCoinsData();
    coinstData.forEach(cryptoCoin => {
        options.title.text += `${cryptoCoin.key}, `
    });
    options.title.text += 'to USD.'
    }

    //set interval to show data live every 2 seconds, empty the data that was shown before and show progress spinner if there's nothing yet.
    document.getElementById('profile-tab').addEventListener('click', () => {
        document.querySelector('.cryptoCharts').classList.add('hide')
        options.data.forEach(data => {
            data.dataPoints = [];
        })
        if(cryptoAPILink !== '') {
        document.querySelector('.cryptoCharts').classList.remove('hide')
        document.querySelector('.spinner').classList.add('hide')
        myInterval = setInterval(updateData, 2000);}
        makeAtitle();
    });

    //clear interval if we go back to other tabs
    document.getElementById('home-tab').addEventListener('click', ()=>{
        clearInterval(myInterval);
    })
    document.getElementById('contact-tab').addEventListener('click', ()=>{
        clearInterval(myInterval);
    })
    
