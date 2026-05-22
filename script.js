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

// Daily Workout Planner

const workoutInput =
  document.getElementById('workout-input');

const durationInput =
  document.getElementById('duration-input');

const addWorkoutBtn =
  document.getElementById('add-workout-btn');

const workoutList =
  document.getElementById('workout-list');


// Load Saved Workouts
window.addEventListener('DOMContentLoaded', loadWorkouts);


// Add Workout
addWorkoutBtn.addEventListener('click', () => {

  const workout =
    workoutInput.value.trim();

  const duration =
    durationInput.value.trim();

  if(workout === '' || duration === '') {
    alert('Please enter workout and duration');
    return;
  }

  const workoutData = {
    workout,
    duration,
    completed: false
  };

  addWorkoutToDOM(workoutData);

  saveWorkout(workoutData);

  workoutInput.value = '';
  durationInput.value = '';

});


// Add Workout To DOM
function addWorkoutToDOM(data) {

  const li = document.createElement('li');

  li.classList.add('workout-item');

  if(data.completed) {
    li.classList.add('completed');
  }

  li.innerHTML = `
    <div class="workout-info">
      <h3>${data.workout}</h3>
      <p>${data.duration} Minutes</p>
    </div>

    <div class="workout-buttons">
      <button class="complete-btn">
        ✔
      </button>

      <button class="delete-btn">
        ✖
      </button>
    </div>
  `;

  // Complete Workout
  li.querySelector('.complete-btn')
    .addEventListener('click', () => {

      li.classList.toggle('completed');

      updateLocalStorage();
  });

  // Delete Workout
  li.querySelector('.delete-btn')
    .addEventListener('click', () => {

      li.remove();

      updateLocalStorage();
  });

  workoutList.appendChild(li);

}


// Save Workout
function saveWorkout(workoutData) {

  let workouts =
    JSON.parse(localStorage.getItem('workouts')) || [];

  workouts.push(workoutData);

  localStorage.setItem(
    'workouts',
    JSON.stringify(workouts)
  );
}


// Load Workouts
function loadWorkouts() {

  let workouts =
    JSON.parse(localStorage.getItem('workouts')) || [];

  workouts.forEach((workout) => {
    addWorkoutToDOM(workout);
  });

}


// Update Storage
function updateLocalStorage() {

  const workouts = [];

  document.querySelectorAll('.workout-item')
    .forEach((item) => {

      workouts.push({
        workout:
          item.querySelector('h3').innerText,

        duration:
          item.querySelector('p')
            .innerText.replace(' Minutes', ''),

        completed:
          item.classList.contains('completed')
      });

  });

  localStorage.setItem(
    'workouts',
    JSON.stringify(workouts)
  );

}

// AI Fitness Chatbot

const chatToggle =
  document.getElementById('chat-toggle');

const chatWindow =
  document.getElementById('chat-window');

const chatInput =
  document.getElementById('chat-input');

const sendBtn =
  document.getElementById('send-btn');

const chatBody =
  document.getElementById('chat-body');


// Open / Close Chat

chatToggle.addEventListener('click', () => {

  if(chatWindow.style.display === 'flex') {
    chatWindow.style.display = 'none';
  }
  else {
    chatWindow.style.display = 'flex';
  }

});


// Send Message

sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {

  if(e.key === 'Enter') {
    sendMessage();
  }

});


// Main Chat Function

function sendMessage() {

  const message = chatInput.value.trim();

  if(message === '') return;

  // User Message
  const userDiv =
    document.createElement('div');

  userDiv.classList.add('user-message');

  userDiv.innerText = message;

  chatBody.appendChild(userDiv);

  // Bot Reply
  const botDiv =
    document.createElement('div');

  botDiv.classList.add('bot-message');

  botDiv.innerText = getBotReply(message);

  setTimeout(() => {
    chatBody.appendChild(botDiv);

    chatBody.scrollTop =
      chatBody.scrollHeight;
  }, 500);

  chatInput.value = '';

}


// AI Reply Logic

function getBotReply(message) {

  message = message.toLowerCase();

  // Workout
  if(message.includes('workout')) {
    return 'Try a mix of strength training and cardio 4-5 days weekly for best results.';
  }

  // Weight Loss
  else if(message.includes('weight loss')) {
    return 'Focus on calorie deficit, high protein meals, and regular cardio workouts.';
  }

  // Muscle Gain
  else if(message.includes('muscle')) {
    return 'For muscle gain, increase protein intake and follow progressive overload training.';
  }

  // Diet
  else if(message.includes('diet')) {
    return 'Eat balanced meals with protein, healthy fats, fruits, and vegetables.';
  }

  // Cardio
  else if(message.includes('cardio')) {
    return 'Cardio improves heart health and burns calories. Try running, cycling, or HIIT.';
  }

  // Motivation
  else if(message.includes('motivation')) {
    return 'Stay consistent. Small progress every day leads to big transformation.';
  }

  // Protein
  else if(message.includes('protein')) {
    return 'Good protein sources include eggs, chicken, fish, paneer, milk, and beans.';
  }

  // Beginner
  else if(message.includes('beginner')) {
    return 'Start with simple full-body workouts 3 times weekly and focus on proper form.';
  }

  // Greeting
  else if(message.includes('hello')
       || message.includes('hi')) {

    return 'Hello 👋 Ready to crush your fitness goals today?';
  }

  // Default
  else {
    return 'I can help with workouts, nutrition, weight loss, muscle gain, and motivation.';
  }

}

// Member Dashboard + Progress Tracker

// Goal Elements

const goalInput =
  document.getElementById('goal-input');

const saveGoalBtn =
  document.getElementById('save-goal-btn');

const goalDisplay =
  document.getElementById('goal-display');


// Weight Elements

const weightTrackInput =
  document.getElementById('weight-track-input');

const saveWeightBtn =
  document.getElementById('save-weight-btn');

const weightDisplay =
  document.getElementById('weight-display');


// Calories Elements

const calorieInput =
  document.getElementById('calorie-input');

const saveCalorieBtn =
  document.getElementById('save-calorie-btn');

const calorieDisplay =
  document.getElementById('calorie-display');


// Load Saved Data

window.addEventListener('DOMContentLoaded', () => {

  // Goal
  const savedGoal =
    localStorage.getItem('fitnessGoal');

  if(savedGoal) {
    goalDisplay.innerText =
      `Goal: ${savedGoal}`;
  }

  // Weight
  const savedWeight =
    localStorage.getItem('weight');

  if(savedWeight) {
    weightDisplay.innerText =
      `Current Weight: ${savedWeight} kg`;
  }

  // Calories
  const savedCalories =
    localStorage.getItem('calories');

  if(savedCalories) {
    calorieDisplay.innerText =
      `Calories Burned: ${savedCalories}`;
  }

});


// Save Goal

saveGoalBtn.addEventListener('click', () => {

  const goal = goalInput.value.trim();

  if(goal === '') {
    alert('Please enter a goal');
    return;
  }

  localStorage.setItem(
    'fitnessGoal',
    goal
  );

  goalDisplay.innerText =
    `Goal: ${goal}`;

  goalInput.value = '';

});


// Save Weight

saveWeightBtn.addEventListener('click', () => {

  const weight =
    weightTrackInput.value.trim();

  if(weight === '') {
    alert('Please enter weight');
    return;
  }

  localStorage.setItem(
    'weight',
    weight
  );

  weightDisplay.innerText =
    `Current Weight: ${weight} kg`;

  weightTrackInput.value = '';

});


// Save Calories

saveCalorieBtn.addEventListener('click', () => {

  const calories =
    calorieInput.value.trim();

  if(calories === '') {
    alert('Please enter calories');
    return;
  }

  localStorage.setItem(
    'calories',
    calories
  );

  calorieDisplay.innerText =
    `Calories Burned: ${calories}`;

  calorieInput.value = '';

});