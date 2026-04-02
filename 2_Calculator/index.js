const buttons = document.querySelectorAll("button");
const input = document.getElementById('result');

for(let i = 0; i<buttons.length; i++){
  buttons[i].addEventListener('click', () => {
    const buttonValue = buttons[i].textContent;
    
    if(buttonValue === 'C'){
      clearResult()
    }
    else if (buttonValue === '='){
      calculateResult();
    }
    else {
      appendValue(buttonValue);
    }
  });
}

function clearResult(){
  input.value = '';
}

function calculateResult(){
  input.value = eval(input.value);
}

function appendValue(buttonValue){
  input.value += buttonValue;
}