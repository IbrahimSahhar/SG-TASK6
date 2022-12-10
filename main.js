const todoMenu = document.querySelector(".todo-menu"),
    titleInput = document.querySelector(".title-input"),
    descInput = document.querySelector(".desc-input"),
    ButtonToAdd = document.getElementById("add-icon"),
    ButtonToSave = document.getElementById("save-icon"),
    ButtonToCancel = document.getElementById("cancel-icon"),
    activeArticle = document.querySelector("article.active"),
    disabledFooter = document.querySelector("footer.disabled");


const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        JSON.parse(xhr.response);
        const ArrayOfTodo = JSON.parse(xhr.response).map(element => {
            return {
                title: element.title,
                desc: element.body
            }
        });
        showTodos(ArrayOfTodo);
    }
}

const createTodoCard = (title, desc) => {
    const todo = document.createElement('div');
    todo.classList.add("todo");
    todo.innerHTML = `
        <h2 class="todo-title">${title}</h2>
        <p class="todo-content">${desc}</p>
`
    return todo
}

const showTodos = (array) => {
    array.forEach(todo => {
        todoMenu.appendChild(createTodoCard(todo.title, todo.desc))
    });
}

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
xhr.send();

//add button
ButtonToAdd.addEventListener('click', () => {
    disabledFooter.style = 'display: none';
    activeArticle.style = 'display: block';
    todoMenu.style = 'padding-bottom: 0px;'
    todoMenu.scrollTo(0, todoMenu.scrollHeight);
});

//cancel button
ButtonToCancel.addEventListener('click', () => {
    disabledFooter.style = 'display: flex';
    activeArticle.style = 'display: none';
    todoMenu.style = 'padding-bottom: 100px;'
    todoMenu.scrollTo(0, 0);
});

//save button
ButtonToSave.addEventListener('click', () => {
    const title = titleInput.value;
    const desc = descInput.value;

    title === "" ? titleInput.style = 'background: url("https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg") no-repeat 95% 50% lightsalmon;' : titleInput.style = '  background: url("https://assets.digitalocean.com/labs/icons/hand-thumbs-up.svg") no-repeat 95% 50% lightgreen;';

    desc === "" ? descInput.style = 'background: url("https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg") no-repeat 95% 50% lightsalmon;' : descInput.style = '  background: url("https://assets.digitalocean.com/labs/icons/hand-thumbs-up.svg") no-repeat 95% 50% lightgreen;    ';

    if (title !== "" && desc !== "") {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
                title: title,
                body: desc
            })
        }).then(res => {
            console.log(res);
            todoMenu.appendChild(createTodoCard(title, desc))
            todoMenu.scrollTo(0, todoMenu.scrollHeight);
            titleInput.value = ""
            descInput.value = ""
            todoMenu.style = 'padding-bottom: 100px;';
            disabledFooter.style = 'display: flex';
            activeArticle.style = 'display: none';
        })
    }
});