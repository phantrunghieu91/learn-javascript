class TodoApp {
    constructor(){
        this.todosList = [];
        this.todosContainer = document.getElementById('todos-container');
        this.remainTodosDisplay = document.getElementById('remain-todos');
        document.getElementById('add-todo').addEventListener('click', this.addNewTodo);
        document.getElementById('hide-completed').addEventListener('click', this.renderTodosList);
        document.getElementById('search-input').addEventListener('input', this.renderTodosList);
    }

    renderTodosList = () => {
        this.displayRemainTodos();
        this.todosContainer.innerHTML = '';
        let todos = this.searchTodo();        
        todos.forEach((todo, index) => {
            const label = document.createElement('label');
            label.classList.add('list-item');
            const completeState = todo.getStatus() == true ? 'completed' : 'incomplete';
            label.classList.add(completeState);
            if(this.hideCompletedTodo() && todo.getStatus()) {
                label.style.display = 'none';
            } else if(label.style.display == 'none') {
                label.style.display = 'flex';
            }

            const div = document.createElement('div');
            div.classList.add('list-item-container');

            const checkbox = document.createElement('input');
            checkbox.value = index;
            checkbox.type = 'checkbox';
            checkbox.addEventListener('click', this.changeTodoStatus);
            checkbox.style.visibility = 'hidden';

            const span = document.createElement('span');
            span.textContent = todo.title;

            const removeBtn = document.createElement('button');
            removeBtn.onclick = () => {
                this.removeTodo(index);
            };
            removeBtn.textContent = 'Remove';

            div.append(checkbox);
            div.append(span);
            label.append(div);
            label.append(removeBtn);
            this.todosContainer.append(label);
        });
        // this.todosList.forEach((e, i) => console.log(e.title, this.todosListDisplays[i].textContent));
    };

    displayRemainTodos = () => {
        const incompleteTodos = this.todosList.filter(todo => todo.getStatus() == false);
        this.remainTodosDisplay.textContent = incompleteTodos.length > 1 ? `${incompleteTodos.length} todos` : `${incompleteTodos.length} todo`;
    };

    addNewTodo = () => {
        const title = document.getElementById('todo-input').value;
        if(title != '') {
            const todo = new Todo(title);
            this.todosList.unshift(todo);
        }
        this.renderTodosList();
    };

    removeTodo = (index) => {
        this.todosList.splice(index, 1);
        this.renderTodosList();
    };

    changeTodoStatus = (event) => {
        const checkbox = event.currentTarget;      
        const label = event.currentTarget.parentNode.parentNode;
        label.classList.remove(checkbox.checked == true ? 'completed' : 'incomplete');
        for(let index in this.todosList ){
            if(index == checkbox.value) {
                this.todosList[index].setStatus(!this.todosList[index].getStatus());
                break;
            }
        };
        this.renderTodosList();
    };

    hideCompletedTodo = () => {
        const checkbox = document.getElementById('hide-completed');
        return checkbox.checked;
    };

    searchTodo = () => {
        let searchInput = document.getElementById('search-input').value;
        let searchedTodos;
        if(searchInput != '') {
            searchedTodos = this.todosList.filter(todo => {
                const searchCondition = todo.title.includes(searchInput);
                if(searchCondition) {
                    return todo;
                }
            });
        } else {
            searchedTodos = this.todosList;
        }
        return searchedTodos;
    };
};

let app;
const runApp = () => {
    app = new TodoApp();
    app.renderTodosList();
};
runApp();