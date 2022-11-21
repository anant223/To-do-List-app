// implementing IIFE module desing pattern
(function(){
    let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

var a = 10;
async function fetchTodos(){
    // Get req 
    // fetch("https://jsonplaceholder.typicode.com/todos").then(function(res){
    //     console.log(res)
    //     return res.json();
    // }).then(function(data){
    //     // console.log(data)
    //     tasks = data.slice(0, 10);
    //     renderList();
    // })
    // .catch(function(err){
    //     console.log(err)
    // });
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        tasks = data.slice(0, 10);
        renderList();

    } catch (err) {
        console.log(err);
    }
}

// console.log('Working');
function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked': ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png?w=740&t=st=1668847641~exp=1668848241~hmac=1e5ca5c9d00a67aff5a5e63431473d0e8c8e56df5f97d8d60a80f2e26eabca4a" class="delete" data-id="${task.id}" />
  `;

  taskList.append(li);
}



function renderList () {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++){
        addTaskToDOM(tasks[i])
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) {
    const task = tasks.filter(function(task){
        return task.id === Number(taskId)
    });

    if (task.length > 0){
        const currTask = task[0];

        currTask.completed = !currTask.completed;
        renderList();
        showNotification('Task toggled successfully!');
        return;
    }

    showNotification("couldn't toggle the task")
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== Number(taskId);
    });

    tasks = newTasks;
    renderList();
    showNotification('Task delted sucessfully');
    return;
}

function addTask (task) {
    if (task){
        // fetch("https://jsonplaceholder.typicode.com/todos", {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(task),
        //   }).then(function(res){
        //     return res.json();
        // }).then(function(data){
        //     tasks.push(task);
        //     renderList();
        //     showNotification('added')
        // })
        // .catch(function(err){
        // console.log(err)
        // });

        tasks.push(task);
        renderList();
        showNotification('added')
        return;
    }
    showNotification('task is not added!')

    
}

function showNotification(text) {
    alert(text);
}

function handelInputKeypress(e){
    if(e.key === "Enter"){
        const text = e.target.value;
        console.log(text);
        if(!text){
            showNotification('Task text can not be empty');
            return;
        }
        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }

        e.target.value = '';
        addTask(task);
    }
    
}

function handelClickListener(e){
    const target = e.target;
    // console.log(target);

    if (target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId)

    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);

    }
}

function initializeApp(){
    fetchTodos();
    addTaskInput.addEventListener('keyup',handelInputKeypress);
    document.addEventListener('click', handelClickListener);
}

initializeApp()

})()




