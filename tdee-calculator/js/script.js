let gender = document.querySelector('input[name="tdee-gender"]:checked').value;
const age = document.querySelector('#tdee-age');
const weight = document.querySelector('#tdee-weight');
const height = document.querySelector('#tdee-height');
const activity = document.querySelectorAll('input[name="tdee-activity"]');
const tdeeForm = document.querySelector('#tdee-form');
const result = document.querySelector('#tdee-result');

let bmr = 0;
let multiplier = 1.2;

tdeeForm.addEventListener('change', () => {
   
   activity.forEach(input => {
      if(input.checked) {
         multiplier = input.value;
      }
   });

   gender = document.querySelector('input[name="tdee-gender"]:checked').value;
   
});

tdeeForm.addEventListener('submit', e => {
   e.preventDefault();

   if(gender === 'male') {
   
      bmr = 66 + (13.7 * weight.value) + (5 * height.value) - (6.8 * age.value);
   
   }
   
   if(gender === 'female') {
      
      bmr = 655 + (9.6 * weight.value) + (1.8 * height.value) - (4.7 * age.value);
   
   }

   let tdee = Math.round(bmr * multiplier);

   result.setAttribute('data-tdee-result-visible', true);

   // Scroll smoothly to the top to see the result
   scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
   });

   result.innerHTML = `
      <p>${tdee}</p>
      <span>calories per day</span>
   `;

});