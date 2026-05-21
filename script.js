// Newsletter Form Alert
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  alert('Thank you for subscribing to Fitness Hub!');

  form.reset();
});

// Read More Buttons
const buttons = document.querySelectorAll('.read-btn');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    alert('Full article page can be added next.');
  });
});

// BMI Calculator
function calculateBMI() {

  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const result = document.getElementById('result');

  if(height === '' || weight === '') {
    result.innerHTML = 'Please enter height and weight';
    return;
  }

  const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

  let status = '';

  if(bmi < 18.5) {
    status = 'Underweight';
  }
  else if(bmi >= 18.5 && bmi < 24.9) {
    status = 'Normal Weight';
  }
  else if(bmi >= 25 && bmi < 29.9) {
    status = 'Overweight';
  }
  else {
    status = 'Obese';
  }

  result.innerHTML = `Your BMI is ${bmi} (${status})`;
}

// Dark / Light Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');

// Save Theme Preference
if(localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  toggleBtn.innerHTML = '☀️';
}

// Toggle Theme
toggleBtn.addEventListener('click', () => {

  document.body.classList.toggle('light-mode');

  if(document.body.classList.contains('light-mode')) {
    toggleBtn.innerHTML = '☀️';
    localStorage.setItem('theme', 'light');
  }
  else {
    toggleBtn.innerHTML = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});