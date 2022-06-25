class Expense {
    constructor(title, amount) {
        this.title = title;
        this.amount = amount;
    }
};

class BudgetApp {
    constructor(budget = 0, expenses = []) {
        this.budget = budget;
        this.expenses = expenses;
        this.totalExpenses = 0;
        document.querySelector('#add-expense').addEventListener('click', this.addExpense);
        document.querySelector('#calculate-button').addEventListener('click', this.calculate);
    }

    render = () => {
        const budgetDisplay = document.querySelector('#budget');
        const expenseDisplay = document.querySelector('#expense');
        const balanceDisplay = document.querySelector('#balance');
        const expensesDisplay = document.querySelector('div.expense-detail table tbody');
        expensesDisplay.innerHTML = '';

        if(this.expenses.length > 0) {
            this.expenses.forEach((expense, index) => {
                const row = document.createElement('tr');
                row.id = `expense-${index}`;
                const title = document.createElement('td');
                title.innerHTML = `<span>${expense.title}</span>`;
                const amount = document.createElement('td');
                amount.innerHTML = `<span>${expense.amount}</span>`;
                const buttonsCell = document.createElement('td');
                const removeBtn = document.createElement('a');
                removeBtn.innerHTML = `<i class="bi bi-trash"></i>`;
                removeBtn.addEventListener('click', () => {
                    this.removeExpense(index);
                });
                const editBtn = document.createElement('a');
                editBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
                editBtn.addEventListener('click', () => {
                    this.editExpense(index);
                });
                buttonsCell.append(editBtn, removeBtn);
                row.append(title, amount, buttonsCell);
                expensesDisplay.append(row);
            });
        }
        
        budgetDisplay.innerText = this.budget;
        expenseDisplay.innerText = this.totalExpenses;
        balanceDisplay.innerText = this.budget - this.totalExpenses;
    };

    calculate = () => {
        this.budget = +document.querySelector('#budget-input').value;
        this.render();
    };

    addExpense = () => {
        const expenseTitle = document.querySelector('#expense-title');
        const expenseAmount = document.querySelector('#expense-amount');
        const expense = new Expense(expenseTitle.value, +expenseAmount.value);
        this.expenses.push(expense);
        this.calculateTotalExpenses();
        expenseTitle.value = '';
        expenseAmount.value = '';
        this.render();
    };

    calculateTotalExpenses = () => {
        this.totalExpenses = 0;
        if(this.expenses.length > 0) {
            this.expenses.forEach(expense => this.totalExpenses += expense.amount);
        }
    };

    removeExpense = (index) => {
        // if(confirm('Do you really wanna remove this ?')) 
        this.expenses.splice(index, 1);
        this.calculateTotalExpenses();
        this.render();
    };
    
    editExpense = (index) => {
        const expenseRow = document.querySelector(`#expense-${index}`);
        expenseRow.children[0].innerHTML = `<input type='text' id='editing-title' value='${this.expenses[index].title}'>`;
        expenseRow.children[1].innerHTML = `<input type='text' id='editing-amount' value='${this.expenses[index].amount}'>`;
        const yesNoContainer = document.createElement('div');
        yesNoContainer.classList.add('yes-no-container');
        const yesBtn = document.createElement('a');
        yesBtn.innerHTML = `<i class="bi bi-check-lg"></i>`;
        yesBtn.addEventListener('click', () => {
            const title = document.querySelector('#editing-title').value;
            const amount = +document.querySelector('#editing-amount').value;
            this.expenses[index].title = title;
            this.expenses[index].amount = amount;
            this.calculateTotalExpenses();
            this.render();
        });
        const noBtn = document.createElement('a');
        noBtn.addEventListener('click', () => {
            this.render();
        });
        noBtn.innerHTML = `<i class="bi bi-x-lg"></i>`;
        yesNoContainer.append(yesBtn, noBtn);
        expenseRow.children[2].style.position = 'relative';
        expenseRow.children[2].append(yesNoContainer);
    };
};

const app = new BudgetApp();
app.render();