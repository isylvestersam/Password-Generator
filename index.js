const screen = document.querySelector('#screen');
const lengthText = document.querySelector('#length-text');
const slider = document.querySelector('#slider');
const lowerCaseTick = document.querySelector('#lowercase-tick');
const upperCaseTick = document.querySelector('#uppercase-tick');
const numberTick = document.querySelector('#number-tick');
const symbolTick = document.querySelector('#symbol-tick');
const strengthText = document.querySelector('#strength-text');
const strengthBars = document.querySelectorAll('.strength-bar');
const ticks = document.querySelectorAll('.ticks');
const generateBtn = document.querySelector('.generate-btn');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '~!@#$%^&*()_+}{|":><.,?/'


// Change Character Length Input when Slider changes;
slider.addEventListener("input", () => {
    lengthText.textContent = slider.value
});

// Add Hidden to tick when user clicks on it;
ticks.forEach(tick => {
    tick.addEventListener('click', e => {
        tick.classList.toggle('opacity-0')
    })
});

// Create Random Password
function createRandPassword() {
    let uppercaseChecked = true;
    let lowercaseChecked = true;
    let numberChecked = true;
    let symbolChecked = true;

    const checkedArray = [uppercaseChecked, lowercaseChecked, numberChecked, symbolChecked]

    // If any checkbox is hidden, then the checked is set to false;
    ticks.forEach((tick, idx) => {
        if (tick.classList.contains('opacity-0')) {
            checkedArray[idx] = false;
        } 
        else {
            checkedArray[idx] = true;
        }
    });
    // Update The Check properties;
    uppercaseChecked = checkedArray[0];
    lowercaseChecked = checkedArray[1];
    numberChecked = checkedArray[2];
    symbolChecked = checkedArray[3];

    // Add the appropriate chars when checkbox is checked
    let numberPool = '';
    if (uppercaseChecked){
        numberPool += uppercase
    }
    if (lowercaseChecked){
        numberPool += lowercase
    }
    if (numberChecked){
        numberPool += numbers
    }
    if (symbolChecked){
        numberPool += symbols
    }
    if (!uppercaseChecked && !lowercaseChecked && !numberChecked && !symbolChecked){
        alert('Please Select One Value');
        return
    }
    const randNumber = generateRandNumber(numberPool);
    screen.value = randNumber;
}
function generateRandNumber(numberPool) {
    // Create Random Number;
    let randNumber = '';
    for (let i = 0; i < slider.value; i++) {
        randNumber += numberPool[Math.floor(Math.random() * numberPool.length)] 
    }
    return randNumber;
}

generateBtn.addEventListener("click", createRandPassword);
window.addEventListener("DOMContentLoaded", createRandPassword)