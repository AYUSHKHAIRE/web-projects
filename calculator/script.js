let string = "";
let buttons = document.querySelectorAll('.button');
let hist = document.getElementById('lastcalc');
let calculationHistory = [];
let inputField = document.querySelector('input');

inputField.value = "0"; // Initialize input value to 0

Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.innerHTML === '=') {
      let result = eval(string);
      inputField.value = result;
      if (result == undefined || string == "undefined") {
        calculationHistory.push(`wrong input`);
        inputField.value = "wrong input"
      }
      else
        calculationHistory.push(`${string} = ${result}`);
      updateHistory();
      string = ""; // Clear the string after calculation
    } else if (e.target.innerHTML === 'C') {
      string = "";
      inputField.value = "0"; // Set input value to 0 after clicking on 'C'
    } else {
      if (inputField.value === "0") {
        inputField.value = ""; // Clear the initial 0 before appending other digits or operators
      }
      string = string + e.target.innerHTML;
      inputField.value = string;
    }
  });
});

function updateHistory() {
  hist.innerHTML = "";
  calculationHistory.forEach((calculation) => {
    const p = document.createElement('p');
    p.textContent = calculation;
    hist.appendChild(p);
  });
}

