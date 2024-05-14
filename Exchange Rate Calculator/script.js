const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amtOne = document.getElementById('amount-one');
const amtTwo = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


//fetch exchange rate and update DOM
function calculate(){
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data =>{
        //console.log(data);
        const rate = data.rates[currency_two];
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amtTwo.value = (amtOne.value * rate).toFixed(2);
    });
}

//event listeners
currencyOne.addEventListener('change',calculate);
amtOne.addEventListener('input',calculate);
currencyTwo.addEventListener('change',calculate);
amtTwo.addEventListener('input',calculate);


swap.addEventListener('click',()=>{
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
});