
import './styles.css';

const amountEl = document.getElementById('amount') as HTMLInputElement;
const btnCalculateEl = document.getElementById('calculate') as HTMLButtonElement;
const billAmountSpan = document.getElementById('bill-amount') as HTMLSpanElement;
const tipAmountSpan = document.getElementById('tip-amount') as HTMLSpanElement;
const totalAmountSpan = document.getElementById('total-amount') as HTMLSpanElement;
const tipButtons = document.querySelectorAll('.tip-button') as NodeListOf<HTMLButtonElement>

btnCalculateEl.addEventListener('click', handleClick);

let tipPercentage = 0.2;

function handleClick() {

    if (amountEl.valueAsNumber) {
        const billAmount = amountEl.valueAsNumber;
        billAmountSpan.innerText = `$${billAmount}`
        const tipAmount = billAmount * tipPercentage;
        tipAmountSpan.innerText = `$${tipAmount}`;
        const total = billAmount + tipAmount;
        totalAmountSpan.innerText = `$${total}`;
        console.log(`The amount is ${billAmount}`);
    }
}

tipButtons.forEach(tipButton => tipButton.addEventListener('click', function handleTipButtonClick() {
    console.log('You clicked: ', this);
    tipPercentage = parseFloat(tipButton.dataset.tip);
    handleClick();
    this.disabled = true;
    const that = this;
    tipButtons.forEach(b => {
        if (b !== that) {
            b.disabled = false;
        }
    })
}));