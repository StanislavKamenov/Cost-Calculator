let addButton = document.querySelector('.add-new-info');

function renderTransaction(data, containerSelector) {
    let container = document.querySelector(containerSelector);
    let item = document.createElement('div');
    item.classList.add(containerSelector === '.transactions' ? 'transaction-item' : 'income-item');

    let formattedAmount = data.amount < 0 ? data.amount : `+${data.amount}`;

    item.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.company} ${data.date}</p>
        <p class="amount ${data.amount < 0 ? 'negative' : ''}">
            ${formattedAmount}
        </p>
    `;
    container.appendChild(item);
}

function calculateTotalTransactions() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let total = transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    return total;
}

function calculateTotalIncome() {
    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    let total = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
    return total;
}

function updateTotals() {
    let totalTransactions = calculateTotalTransactions();
    let totalIncome = calculateTotalIncome();

    let totalTransactionsElement = document.querySelector('.total-transactions p');
    totalTransactionsElement.textContent = `Total Transactions: ${totalTransactions.toFixed(2)}`;

    let totalIncomeElement = document.querySelector('.total-income p');
    totalIncomeElement.textContent = `Total Income: ${totalIncome.toFixed(2)}`;
}

function loadStoredData() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(data => renderTransaction(data, '.transactions'));

    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.forEach(data => renderTransaction(data, '.income'));
}

addButton.addEventListener('click', function () {
    let selectElement = document.querySelector('#option');
    let selectedValue = selectElement.value;

    let transactionName = document.querySelector('#transaction-name').value;
    let transactionDate = document.querySelector('#transaction-date').value;
    let transactionAmount = parseFloat(document.querySelector('#transaction-amount').value);
    let transactionCompany = document.querySelector('#transaction-company').value;

    if (!transactionName || !transactionDate || isNaN(transactionAmount) || !transactionCompany) {
        alert('Please fill in all fields');
        return;
    }

    let transactionData = {
        name: transactionName,
        date: transactionDate,
        amount: selectedValue === 'Transaction' ? -Math.abs(transactionAmount) : Math.abs(transactionAmount),
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

    updateTotals();
});

document.addEventListener('DOMContentLoaded', function () {
    loadStoredData();
    updateTotals();
});
