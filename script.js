// variables

const availableMoney = document.querySelector('.available-money');
const addTransaction = document.querySelector('.add-transaction');
const deleteAllBtn = document.querySelector('.delete-all');
const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');

// ? panel 
const addPanel = document.querySelector('.add-transaction-panel');
const closePanel = document.querySelector('.cancel');
const saveTransaction = document.querySelector('.save');
const formName = document.querySelector('#name');
const formAmount = document.querySelector('#amount');
const formSelect = document.querySelector('#category')
// ? panel error
const error = document.querySelector('.error');
let transactionID = 1;
let iconCategory;
let kindOf = false;
let balance = 0;
const checkCategory = (iconCategory) => {
    switch (formSelect.value) {
        case 'income':
            iconCategory = 'fa-money';
            break;
        case 'shopping':
            iconCategory = 'fa-shopping-basket'
            break;
        case 'food':
            iconCategory = 'fa-cutlery'
            break;
        case 'cinema':
            iconCategory = 'fa-video-camera'
            break;
    }
    return iconCategory
}

const checkBalance = () => {
    let formBalance = formAmount.value
    if (formAmount.value[0] === '-') {
        formBalance = formBalance.slice(1)
        formBalance = parseFloat(formBalance)
        balance = balance - formBalance;

    } else {
        formBalance = parseFloat(formBalance)
        balance = balance + formBalance;
    }
    availableMoney.textContent = balance;
}



const transactionContainer = () => {
    let transaction = document.createElement('div');
    transaction.setAttribute('class', 'transaction');
    transaction.setAttribute('id', transactionID);
    let transactionInner = `
    <p class="transaction-name">
        <i class="fa ${checkCategory()}" aria-hidden="true" ></i>
        ${formName.value}
    </p>
    <p class="transaction-amount">
        ${formAmount.value}zł
        <button class="delete" onclick="deleteNote(${transactionID})">
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
    </p>`
    transaction.innerHTML = transactionInner
    console.log(kindOf)
    if (formSelect.value === 'income') {
        incomeArea.appendChild(transaction);
    } else {
        expensesArea.appendChild(transaction);
    }
    transactionID++;
}


const checkForm = () => {
    if (formName.value != '' && formAmount != '' && formSelect.value != 'none') {
        return true
    } else {
        return false
    }
}
const showError = () => {
    error.textContent = 'Uzupełnij wszystkie dane'
}
const clearForm = () => {
    formAmount.value = ''
    formName.value = ''
    formSelect.selectedIndex = 0;

}

const createTransaction = () => {
    if (checkForm()) {
        transactionContainer();
        checkBalance();
        statusModal()
        clearForm()

    } else {
        showError()
    }
}

// ! Open modal
const statusModal = () => {
    const style = getComputedStyle(addPanel, null).display
    if (style === 'none') {
        addPanel.style.display = 'flex'
    } else {
        addPanel.style.display = 'none'
    }

}

const deleteAll = () => {
    document.querySelectorAll('.transaction').forEach(e => e.remove());
    transactionID = 0;
}

const deleteNote = id => {
    el = document.getElementById(id);
    let price = el.querySelector('.transaction-amount');
    price = parseFloat(price.textContent)
    balance = balance - price;
    availableMoney.textContent = balance;
    el.remove();
}


// ? addEventListener
addTransaction.addEventListener('click', statusModal);
closePanel.addEventListener('click', statusModal);
saveTransaction.addEventListener('click', createTransaction);
deleteAllBtn.addEventListener('click', deleteAll);