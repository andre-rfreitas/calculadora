const result = document.getElementById('result');
const digits = document.getElementsByClassName('digit');
const operators = document.getElementsByClassName('operator');
const decimal = document.getElementById('decimal');
const clear = document.getElementById('clear');
const calculate = document.getElementById('calculate');

for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener('click', function() {
    if (result.value === '0') {
      result.value = '';
    }
    result.value += this.innerText;
  });
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', function() {
    if (result.value !== '' && result.value.slice(-1) !== this.innerText) {
      result.value += this.innerText;
    }
  });
}

decimal.addEventListener('click', function() {
  if (!result.value.includes('.')) {
    result.value += '.';
  }
});

clear.addEventListener('click', function() {
  result.value = '0';
});

calculate.addEventListener('click', function() {
  const expression = result.value;
  const numberRegex = /-?\d*\.?\d+/g;
  const operatorRegex = /[\+\-\*\/]/g;

  const numbers = expression.match(numberRegex);
  const operators = expression.match(operatorRegex);

  if (!numbers || !operators || numbers.length - 1 !== operators.length) {
    result.value = 'Error';
    return;
  }

  let total = parseFloat(numbers[0]);

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = parseFloat(numbers[i + 1]);

    switch (operator) {
      case '+':
        total += nextNumber;
        break;
      case '-':
        total -= nextNumber;
        break;
      case '*':
        total *= nextNumber;
        break;
      case '/':
        total /= nextNumber;
        break;
    }
  }

  result.value = total;
});
