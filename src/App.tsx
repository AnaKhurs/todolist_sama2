import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValueType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type AllTasksType = {
    [todoListsID1: string]: Array<TaskType>
}

function App() {

    const todoListsID1 = v1()
    const todoListsID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListsID1, title: "What to learn", filter: "all"},
        {id: todoListsID2, title: "What to buy", filter: "all"},
    ])

    const [allTasks, setAllTasks] = useState<AllTasksType>({
        [todoListsID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListsID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Books", isDone: true},
        ],
    })

    const removeTask = (id: string, idTodolist: string) => {
        let tasks = allTasks[idTodolist]
        let filteredRemoveTasks = tasks.filter((t) => t.id !== id);
        allTasks[idTodolist] = filteredRemoveTasks;
        setAllTasks({...allTasks});
    }

    const changeTaskChecked = (tId: string, isDone: boolean, idTodolist: string) => {
        const changeTask = allTasks[idTodolist].find(t => t.id === tId)
        if (changeTask) {
            changeTask.isDone = isDone
            setAllTasks({...allTasks})
        }
    }

    const changeFilter = (value: FilterValueType, idTodolist: string) => {
        let todolist = todoLists.find(tl => tl.id === idTodolist)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    const addTask = (value: string, idTodolist: string) => {
        let tasks = allTasks[idTodolist]
        let newTask = {id: v1(), title: value, isDone: false};
        let newTasks = [newTask, ...tasks];
        allTasks[idTodolist] = newTasks
        setAllTasks({...allTasks});
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodoListType = {id: v1(), title: title, filter: "all"}
        setTodoLists([newTodolist, ...todoLists])
        setAllTasks({...allTasks, [newTodolist.id]: []})
    }

    const removeTodolist = (idTodolist: string) => {
        let filteredTodoLists = todoLists.filter(tl => tl.id !== idTodolist)
        setTodoLists([...filteredTodoLists])
        delete allTasks[idTodolist]
    }

    const onChangeTitleTask = (tId: string, newTitle: string, idTodolist: string) => {
        const changeTask = allTasks[idTodolist].find(t => t.id === tId)
        if (changeTask) {
            changeTask.title = newTitle
            setAllTasks({...allTasks})
        }
    }

    const onChangeTodolistTitle = (newTitle:string, idTodolist:string) => {
        let todolist = todoLists.find(tl => tl.id === idTodolist)
        if (todolist) {
            todolist.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todoLists.map(tl => {
                        let taskForTodoList = allTasks[tl.id];
                        if (tl.filter === 'completed') {
                            taskForTodoList = taskForTodoList.filter((t) => t.isDone)
                        }
                        if (tl.filter === 'active') {
                            taskForTodoList = taskForTodoList.filter((t) => !t.isDone)
                        }

                        return <Todolist key={tl.id}
                                         idTodolist={tl.id}
                                         title={tl.title}
                                         tasks={taskForTodoList}
                                         removeTask={removeTask}
                                         changeFilter={changeFilter}
                                         addTask={addTask}
                                         changeTaskChecked={changeTaskChecked}
                                         filter={tl.filter}
                                         removeTodolist={removeTodolist}
                                         onChangeTitleTask={onChangeTitleTask}
                                         onChangeTodolistTitle={onChangeTodolistTitle}
                        />
                    }
                )
            }
        </div>
    );
}

export default App;
