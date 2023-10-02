const dayInterval = 1;
const kmInterval = 50;

/* Get current input values from the form and calculate the total Car Rental amount (Function) */
const crTotalAmount = () => {

   const crLocation = document.querySelector('#cr-location').value;
   const kms = document.querySelector('#cr-total-kms').value;
   const days = document.querySelector('#cr-days').value;

   let locationRate = 0;

   if(crLocation === 'park-street') { locationRate = 500; }
   if(crLocation === 'new-town') { locationRate = 850; }
   if(crLocation === 'salt-lake') { locationRate = 750; }
   if(crLocation === 'esplanade') { locationRate = 450; }
   if(crLocation === 'kolkata-airport') { locationRate = 750; }
   if(crLocation === 'howrah') { locationRate = 650; }

   let totalPrice = (locationRate * 4) + (days * 1000) + (kms * 12);

   document.querySelector('#cr-total-price').value = totalPrice;

};

/* Get the total Car Rental amount for the initial values */
crTotalAmount();

/* When the Location dropdown value changes, call the crTotalAmount function */
document.querySelector('#cr-location').addEventListener('change', crTotalAmount);

/* Decrement the value of the input number field (Function) */
const decrement = (input, initialVal, val) => {

   if(input.value > initialVal) {
      input.value = Number(input.value) - val;
   }
}

/* Increment the value of the input number field (Function) */
const increment = (input, val) => {

   input.value = Number(input.value) + val;

}

/* Get the interval values for the input number field (Function) */
let val = 0;
let initialVal = 0;

const counterValues = (input) => {

   if(input.id === 'cr-total-kms') {
      initialVal = kmInterval * 2;
      val = kmInterval;
   }

   if(input.id === 'cr-days') {
      initialVal = dayInterval * 1;
      val = dayInterval;
   }

   return {initialVal, val};

}

/* Decrement the input number field and call the crTotalAmount function when the value changes */

const decrementButtons = document.querySelectorAll('[data-decrement]');

decrementButtons.forEach(decrementButton => {
   
   decrementButton.addEventListener('click', e => {
      e.preventDefault();

      const input = e.target.parentElement.querySelector('input[type="number"]');
      
      const response = counterValues(input);

      decrement(input, response.initialVal, response.val);

      crTotalAmount();
   });

})

/* Increment the input number field and call the crTotalAmount function when the value changes */

const incrementButtons = document.querySelectorAll('[data-increment]');

incrementButtons.forEach(incrementButton => {
   
   incrementButton.addEventListener('click', e => {
      e.preventDefault();

      const input = e.target.parentElement.querySelector('input[type="number"]');
      
      const response = counterValues(input);

      increment(input, response.val);

      crTotalAmount();
   });

})