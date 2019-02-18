// Grab handles to UI
const taxableIncomeInput = document.querySelector('#taxableIncome');    
const taxPaidInput = document.querySelector('#taxPaid');    
const taxDeductionsInput = document.querySelector('#taxDeductions');    
const taxOffetsInput = document.querySelector('#taxOffsets');    
const submitButtonInput = document.querySelector('#submit');    
const clearButtonInput = document.querySelector('#clear');    
const output = document.querySelector('#output');
var date = document.querySelector('#date');
const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
//Set Date
(function () {
  function checkTime(i) {
      return (i < 10) ? "0" + i : i;
  }

  function startTime() {
      var today = new Date(),
          d = checkTime(today.getDay()),
          mt = checkTime(today.getMonth()),
          y = checkTime(today.getFullYear()),
          h = checkTime(today.getHours()),
          m = checkTime(today.getMinutes()),
          s = checkTime(today.getSeconds());
      date.innerHTML = h + ":" + m + ":" + s + " | " + y + " " + weekDays[parseInt(d)] + " / " + months[parseInt(mt)];
      t = setTimeout(function () {
          startTime()
      }, 500);
  }
  startTime();
})();

// Variables
const taxBrackets = [
  {
    lowerBound: 0,
    number: 0,
    taxRate: 0,
    defaultAmount: 0,
  },
  {
    lowerBound: 18201,
    number: 1,
    taxRate: 0.19,
    defaultAmount: 0,
  },
  {
    lowerBound: 37001,
    number: 2,
    taxRate: 0.325,
    defaultAmount: 3572,
  },
  {
    lowerBound: 87001,
    number: 3,
    taxRate: 0.37,
    defaultAmount: 19822,
  },
  {
    lowerBound: 180001,
    number: 4,
    taxRate: 0.45,
    defaultAmount: 0,
  }
];

// Process Input
submitButtonInput.addEventListener("click", (ev)=>{
  let taxPayable = 0.0;
  let amountOver = 0.0;
  let bracketNumber = 0;
  let taxableIncome = Number(taxableIncomeInput.value) - Number(taxDeductionsInput.value);
  
  // What is the highest tax bracket the taxable income falls into?
  taxBrackets.forEach((bracket) => {
    if(bracket.lowerBound < taxableIncome) {
      bracketNumber = Number(bracket.number);
    }
    console.log(bracketNumber);
  });
  amountOver = taxableIncome - taxBrackets[bracketNumber].lowerBound - Number(taxDeductionsInput.value);
  if(taxableIncome != 0) {
    output.innerHTML = `<p class = "card alert-light mb-1">Taxable Income $${taxableIncome}</p>`;
    output.innerHTML += "<hr>";
    output.innerHTML += `<p class = "card alert-light mb-1">Default Pay $${taxBrackets[bracketNumber].defaultAmount}</p>`;
    output.innerHTML += "<hr>";
    output.innerHTML += `<p class = "card alert-light mb-1">Amount over $${amountOver}</p>`;
    output.innerHTML += "<hr>";
    output.innerHTML += `<p class = "card alert-info mb-1">Tax owed $${amountOver*taxBrackets[bracketNumber].taxRate + taxBrackets[bracketNumber].defaultAmount}</p>`;
  }
});

/*
Taxable income	Tax on this income
$18,201 – $37,000	19c for each $1 over $18,200
$37,001 – $87,000	$3,572 plus 32.5c for each $1 over $37,000
$87,001 – $180,000	$19,822 plus 37c for each $1 over $87,000
$180,001 and over	$54,232 plus 45c for each $1 over $180,000
*/