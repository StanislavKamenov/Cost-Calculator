let transaction = document.querySelector('.transaction-item');
let income = document.querySelector('.income');
let addButton = document.querySelector('.add-new-info');

let tottalTransaction = document.querySelector('.total-transactions');
let tottalIncome = document.querySelector('.total-income');
// let tottalAmount = document.querySelectorAll('amount').length;

document.addEventListener('DOMContentLoaded', function() {

})


addButton.addEventListener('click', function () {
    let selectElement = document.querySelector('#option');
    let selectedValue = selectElement.value;

    let transactionName = document.querySelector('#transaction-name').value;
    let transactionDate = document.querySelector('#transaction-date').value;
    let transactionAmount = parseFloat(document.querySelector('#transaction-amount').value);
    let transactionCompany = document.querySelector('#transaction-company').value;

    if (!transactionName || !transactionDate || !transactionAmount || !transactionCompany) {
        alert('Please fill in all fields');
        return;
    }

    let transactionData = {
        name: transactionName,
        date: transactionDate,
        amount: transactionAmount,
        company: transactionCompany
    };

    if (selectedValue === 'Transaction') {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transactionData);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        renderTransaction(transactionData, '.transactions');

    } else if (selectedValue === 'Income') {
        let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        incomes.push(transactionData);
        localStorage.setItem('incomes', JSON.stringify(incomes));

        renderTransaction(transactionData, '.income');
    }

    document.querySelector('#transaction-name').value = '';
    document.querySelector('#transaction-date').value = '';
    document.querySelector('#transaction-amount').value = '';
    document.querySelector('#transaction-company').value = '';
});

function renderTransaction(data, containerSelector) {
    let container = document.querySelector(containerSelector);
    let item = document.createElement('div');
    item.classList.add(containerSelector === '.transactions' ? 'transaction-item' : 'income-item');

    item.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.company} ${data.date}</p>
        <p class="amount ${data.amount < 0 ? 'negative' : ''}">
            ${data.amount > 0 ? '+' : ''}${data.amount}
        </p>
    `;
    container.appendChild(item);
}

function loadStoredData() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(data => renderTransaction(data, '.transactions'));

    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.forEach(data => renderTransaction(data, '.income'));
}

document.addEventListener('DOMContentLoaded', loadStoredData);
