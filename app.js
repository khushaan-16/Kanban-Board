let tasksData = {}

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");

const columns = [todo, progress, done];

let dragElement = null;


function saveData() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));

        count.innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
}

if(localStorage.getItem("tasks")){

    tasksData = JSON.parse(localStorage.getItem("tasks")) || {};

for (const col in tasksData) {
    const column = document.querySelector(`#${col}`);

    tasksData[col].forEach(task => {
        const div = document.createElement("div");

        div.classList.add("task");
        div.setAttribute("draggable", "true");

        div.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.desc}</p>
            <button>Delete</button>
        `;

        // drag event
        div.addEventListener("dragstart", () => {
            dragElement = div;
        });

        // delete event (optional but useful)
        div.querySelector("button").addEventListener("click", () => {
            div.remove();
            saveData();
        });

        column.appendChild(div);
    });
    
}
}

saveData();

//forEach will add event listener on each task
tasks.forEach(task => {
    task.addEventListener('dragstart', (e)=>{
    
        //we give 'dragElement' the value 'task'
        dragElement = task;
    })

    
})


//the below code will add a drag event listener, and add a class in todo, progress, and done columns, and simultaneously removes that class wen drag event is completed

//we can write the below code for the functionality we need but, we are writing repetitive lines of code


// progress.addEventListener("dragenter", (e)=>{
//     progress.classList.add("hover-over");  
// })

// //it will remove the classlist from progress column when drag event is completed 
// progress.addEventListener("dragleave", (e)=>{
//     progress.classList.remove("hover-over");
// })

// todo.addEventListener("dragenter", (e)=>{
//     todo.classList.add("hover-over");
// })

// todo.addEventListener("dragleave", (e)=>{
//     todo.classList.remove("hover-over");
// })

// done.addEventListener("dragenter", (e)=>{
//     done.classList.add("hover-over");
// })
// done.addEventListener("dragleave", (e)=>{
//     done.classList.remove("hover-over");
// })



// basically we made a function for drag event, and call our columns in that function
function addDragEventsOnColumn(column){
    column.addEventListener("dragenter", (e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    //dragover allows the element to accept a drop
    column.addEventListener("dragover", (e)=>{
        e.preventDefault();
    })


    //after dropping the element in column we append that element in it 
    column.addEventListener("drop", (e)=>{
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

         saveData();

    })

}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");


// when we click on add task button (add new task) modal appears
// when we click anywhere on (add new task) modal.....we came back to home page
toggleModalButton.addEventListener("click", (e)=>{
    modal.classList.add("active");
})

modalBg.addEventListener("click", (e)=>{
    modal.classList.remove("active");
})


addTaskButton.addEventListener("click", ()=>{
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value

    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDesc}</p>
    <button>Delete</button>
`
div.querySelector("button").addEventListener("click", ()=>{
        div.remove();
        saveData();
    })


   todo.appendChild(div)


   columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right")
         
        tasksData[col.id] = Array.from(tasks).map(t => {
            return{
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })

        localStorage.setItem("tasks", JSON.stringify(tasksData))

        count.innerText = tasks.length;
    })
    

   div.addEventListener("dragstart", ()=>{
        dragElement = div;
    })

    modal.classList.remove("active")
})

// in the above addTaskButton code we select the value of task title and task description then we created a div, then added that div in Task, and give it an attribute od draggable, then added an inner HTML for task description and title,,then append that div in 'todo' after that remove 'active' classlist to close the add task modal.