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
const tickParent = document.querySelectorAll('.tick-parent');
const generateBtn = document.querySelector('.generate-btn');
const copyIcon = document.querySelector('.copy-icon');
const copiedIcon = document.querySelector('.copied-icon');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '~!@#$%^&*()_+}{|":><.,?/'


// Change Character Length Input when Slider changes;
slider.addEventListener("input", () => {
    lengthText.textContent = slider.value
});

// Add Hidden to tick when user clicks on it;
tickParent.forEach(tickP => {
    tickP.addEventListener('click', e => {
        const tick = tickP.querySelector('.ticks')
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
    let charVariety = 0;
    if (uppercaseChecked){
        numberPool += uppercase;
        charVariety += 8;
    }
    if (lowercaseChecked){
        numberPool += lowercase;
        charVariety += 12;
    }
    if (numberChecked){
        numberPool += numbers;
        charVariety += 15;
    }
    if (symbolChecked){
        numberPool += symbols;
        charVariety += 15;
    }
    if (!uppercaseChecked && !lowercaseChecked && !numberChecked && !symbolChecked){
        alert('Please Select One Value');
        return
    }
    const randNumber = generateRandNumber(numberPool);
    screen.value = randNumber;
    handlePasswordStrength(charVariety)
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
copyIcon.addEventListener('click', function() {
    copyIcon.classList.add('hidden')
    copiedIcon.classList.remove('hidden');

    setTimeout(() => {
        copyIcon.classList.remove('hidden')
    copiedIcon.classList.add('hidden');
    }, 1500);
    navigator.clipboard.writeText(screen.value)
})

function handlePasswordStrength(charVariety) {
    let length = Number(slider.value);
    const lengthScore = ((length - 6) / (25 - 6)) * 50;
    let total = charVariety + lengthScore;
    let passwordStrength = Math.min(Math.floor(total), 100);
    updateStrengthBar(passwordStrength);
}

function updateStrengthBar(passwordStrength) {
    if (passwordStrength < 30 ) strengthBarLoop(0,'too-weak');
    else if (passwordStrength < 50) strengthBarLoop(1, 'weak')
    else if (passwordStrength < 70) strengthBarLoop(2, 'medium')
    else strengthBarLoop(3, 'strong');
}

function strengthBarLoop(index, classname) {
    // Update Strength Text Content
    const comments = ['Too Weak', 'Weak', 'Medium', 'Strong'];
    strengthText.innerHTML = comments[index];

    // Update the Strength Bars;
    for (let i = 0; i < strengthBars.length; i++) {
        if (i <= index) {
            strengthBars[i].classList.remove("too-weak", 'weak', 'medium', 'strong', "empty");
            strengthBars[i].classList.add(classname);
        }
        else {
            strengthBars[i].classList.remove("too-weak", 'weak', 'medium', 'strong', "empty");
            strengthBars[i].classList.add("empty");
        }
    }
}