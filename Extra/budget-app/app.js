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
        document.querySelector('#add-expense').addEventListener('click', this.addExpense);
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
                const title = document.createElement('td');
                title.innerText = expense.title;
                const amount = document.createElement('td');
                amount.innerText = expense.amount;
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
    };

    calculate = () => {
        
    };

    addExpense = () => {
        const expenseTitle = document.querySelector('#expense-title');
        const expenseAmount = document.querySelector('#expense-amount');
        const expense = new Expense(expenseTitle.value, expenseAmount.value);
        this.expenses.push(expense);
        expenseTitle.value = '';
        expenseAmount.value = '';
        this.render();
    };

    removeExpense = (index) => {
        // if(confirm('Do you really wanna remove this ?')) 
        this.expenses.splice(index, 1);
        this.render();
    };
    
    editExpense = (index) => {
        const addBtn = document.querySelector('#add-expense');

    };
};

const app = new BudgetApp();
app.render();