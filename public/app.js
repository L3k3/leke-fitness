document.querySelectorAll('.add-set').forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.closest('.exercise');
    const input = parent.querySelector('input');
    const result = parent.querySelector('.result');
    const reps = parseInt(input.value, 10) || 0;
    let sets = parseInt(localStorage.getItem(parent.dataset.exercise + '_sets') || '0', 10);
    sets++;
    localStorage.setItem(parent.dataset.exercise + '_sets', sets);
    const total = sets * reps;
    result.textContent = `Sets: ${sets} | Total reps: ${total}`;
  });
});
