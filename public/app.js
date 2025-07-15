const exercises = [
  { name: "Push-ups" },
  { name: "Pull-ups" },
  { name: "Chin-ups" },
  { name: "Bicep Curls" },
  { name: "Tricep Extensions" },
  { name: "Squats" },
  { name: "Lunges" }
];

// Grouped variations: Pull-ups + Chin-ups
const groups = [
  ["Push-ups"],
  ["Pull-ups", "Chin-ups"],
  ["Bicep Curls"],
  ["Tricep Extensions"],
  ["Squats"],
  ["Lunges"]
];

const container = document.getElementById('exercises-container');

groups.forEach(group => {
  const groupDiv = document.createElement('div');
  groupDiv.classList.add('exercise-group');

  group.forEach(exercise => {
    const id = exercise.toLowerCase().replace(/\s+/g, '-');
    const exerciseDiv = document.createElement('div');
    exerciseDiv.classList.add('exercise');
    exerciseDiv.dataset.exercise = id;

    exerciseDiv.innerHTML = `
      <h3>${exercise}</h3>
      <input type="number" min="0" value="10" />
      <button class="add-set">Add Set</button>
      <div class="result">Sets: 0 | Total reps: 0</div>
    `;

    groupDiv.appendChild(exerciseDiv);
  });

  container.appendChild(groupDiv);
});

function updateResult(exerciseDiv) {
  const input = exerciseDiv.querySelector('input');
  const reps = parseInt(input.value, 10) || 0;
  const sets = parseInt(localStorage.getItem(exerciseDiv.dataset.exercise + '_sets') || '0', 10);
  const total = sets * reps;
  const result = exerciseDiv.querySelector('.result');
  result.textContent = `Sets: ${sets} | Total reps: ${total}`;
}

// Restore saved sets
document.querySelectorAll('.exercise').forEach(updateResult);

document.querySelectorAll('.add-set').forEach(button => {
  button.addEventListener('click', () => {
    const exerciseDiv = button.closest('.exercise');
    let sets = parseInt(localStorage.getItem(exerciseDiv.dataset.exercise + '_sets') || '0', 10);
    sets++;
    localStorage.setItem(exerciseDiv.dataset.exercise + '_sets', sets);
    updateResult(exerciseDiv);
  });
});

// Clear all
document.getElementById('clear-all').addEventListener('click', () => {
  localStorage.clear();
  document.querySelectorAll('.result').forEach(result => {
    result.textContent = 'Sets: 0 | Total reps: 0';
  });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  }
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
} else {
  document.body.classList.add('dark-mode');
}
