const result = document.querySelector('#mcalc-result');
const mcalcForm = document.querySelector('#mcalc-form');

const homePrice = document.querySelector('#mcalc-home-price');
const downPayment = document.querySelector('#mcalc-down-payment');
const tenure = document.querySelector('#mcalc-loan-tenure');
const interestRate = document.querySelector('#mcalc-interest-rate');

/* ---------------------------------------------------------------------------------*/
/* Functions */
/* ---------------------------------------------------------------------------------*/

// Mortgage Calculation (Function)
const mortgageCalc = () => {

   let loanAmount = homePrice.value - downPayment.value;
   let n = tenure.value * 12;
   let r = (interestRate.value * 0.01) / 12;

   let monthlyMortgagePayment = loanAmount * ((r * ((1 + r)**n)) / (((1 + r)**n) - 1));

   let pmi = 0;
   let propertyTax = (homePrice.value * 0.0125) / 12;
   let insurance = (homePrice.value * 0.0035) / 12;
   let hoa = 0;

   return [monthlyMortgagePayment, pmi, propertyTax, insurance, hoa];
}

// Update Data (Function)
const updateData = (data) => {

   // The data array contains values of monthlyMortgagePayment, pmi, propertyTax, insurance, hoa

   let monthlyPayment = data[0] + data[1] + data[2] + data[3] + data[4];

   result.innerHTML = `
      <p class="mcalc__result-item">
         <span class="mcalc__result-box mcalc__result-box--pink"></span>
         Monthly Principal & Interest <span>$${data[0].toFixed(2)}</span>
      </p>
      <p class="mcalc__result-item">
         <span class="mcalc__result-box mcalc__result-box--green"></span>
         PMI <span>$${data[1].toFixed(2)}</span>
      </p>
      <p class="mcalc__result-item">
         <span class="mcalc__result-box mcalc__result-box--blue"></span>
         Property Taxes <span>$${data[2].toFixed(2)}</span>
      </p>
      <p class="mcalc__result-item">
         <span class="mcalc__result-box mcalc__result-box--yellow"></span>
         Home Insurance <span>$${data[3].toFixed(2)}</span>
      </p>
      <p class="mcalc__result-item">
         <span class="mcalc__result-box mcalc__result-box--purple"></span>
         HOA Fees <span>$${data[4].toFixed(2)}</span>
      </p>
      <p class="mcalc__result-item mcalc__result-item--bold">
         <span></span>
         ESTIMATED MONTHLY PAYMENT <span>$${monthlyPayment.toFixed(2)}</span>
      </p>
   `;
}

/* ---------------------------------------------------------------------------------*/
/* Update the data with initial values */
/* ---------------------------------------------------------------------------------*/

const initalData = mortgageCalc();
updateData(initalData);

/* ---------------------------------------------------------------------------------*/
/* Chart */
/* ---------------------------------------------------------------------------------*/
const ctx = document.querySelector('#myChart');

// Setup chart with initial data
const data = {
   labels: [
      'Monthly Principal & Interest',
      'PMI',
      'Property Taxes',
      'Home Insurance',
      'HOA'
   ],
   datasets: [{
      data: [initalData[0], initalData[1], initalData[2], initalData[3], initalData[4]],
      backgroundColor: [
         '#ff6384', '#0b810b', '#36a2eb', '#ffcd56', '#780678'
      ],
      hoverOffset: 4
   }]
};

// Config Chart
const config = {
   type: 'doughnut',
   data: data,
   options: {
      cutout: '60%',
      radius: '90%',
      plugins: {
         legend: {
            display: false
         }
      }
   }
}

// Render Chart
const doughnutChart = new Chart(ctx, config);

// Update Chart (Function)
const updateChart = (dataValues) => {
   doughnutChart.data.datasets[0].data = dataValues;
   doughnutChart.update();
};

/* ---------------------------------------------------------------------------------*/
/* When Calculate button is clicked, update the data and chart (Event Listener) */
/* ---------------------------------------------------------------------------------*/

mcalcForm.addEventListener('submit', e => {
   e.preventDefault();

   // Get the new values and store the result in an array
   const data = mortgageCalc();

   // Update the values with the new data
   updateData(data);

   // Update the chart with the new data
   updateChart(data);
});