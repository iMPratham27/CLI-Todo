const readline = require("readline"); 

const fs = require("fs");

const filePath = "./todos.json";

// creates an interface to interact with the user via the command line
const rl = readline.createInterface({

    input : process.stdin, // it reads input from the terminal (keyboard)
    output : process.stdout // it prints output to the terminal
});

// load todos from the file
function loadTodos() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf-8").trim();

        // Handle empty or invalid JSON
        if (data === "") return [];

        try {
            return JSON.parse(data);
        } catch (err) {
            console.error("Error reading JSON file. Resetting todos.");
            return [];
        }
    }

    return [];
}

// save todos
function saveTodos(todos){

    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}


const handleInput = (option) =>{

    let todos = loadTodos();

    if(option === "1"){
        
        // rl.question("String", callback)
        rl.question("Enter task: ", (task)=>{
            todos.push({text: task});
            saveTodos(todos);
            console.log("Task added!\n");
            showMenu();
        });

    }else if(option === "2"){

        if(todos.length === 0){

            console.log("No todos found");
        }else{

            console.log("Your tasks: ");
            for(let i=0; i<todos.length; i++){
                console.log(`Task ${i+1} : ${todos[i].text}`);
            }
        }
        console.log("\n");
        showMenu();

    }else if(option === "3"){

        rl.question("Which task you want to edit: ",(task) => {

            const editTaskIdx = parseInt(task);

            if(editTaskIdx>0 && editTaskIdx <= todos.length){

                rl.question("New task: ", (newTask) => {

                    todos[editTaskIdx-1].text = newTask;
                    saveTodos(todos);

                    console.log("Task edited!\n");
                    showMenu();
                });
            }else{

                console.log("Invalid task number\n");
                showMenu();
            } 
                       
        });
        
    }
    else if(option === "4"){

        rl.question("Which task you want to delete: ", (task) => {
            
            const deleteTask = parseInt(task);

            if(deleteTask > 0 && deleteTask<=todos.length){

                todos.splice(deleteTask-1,1);
                saveTodos(todos);
                
                console.log("Task removed!\n"); 
            }else{

                console.log("Invalid task number\n");
            }
            showMenu();
        });
        
    }else if(option === "5"){

        console.log("Exited.");
        rl.close();

    }else{

        console.log("Invalid input. Enter correct option\n");
        showMenu();
    }
}



function showMenu(){
    console.log("====== TODO MENU ======");
    console.log("1. Add todo");
    console.log("2. View todo");
    console.log("3. Edit todo");
    console.log("4. Delete todo");
    console.log("5. Exit");
    rl.question("Choose an option: ", handleInput);
}

showMenu();