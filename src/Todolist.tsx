import React from 'react';
import {FilterValueType} from "./App";
import './Todolist.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, idTodolist: string) => void
    changeFilter: (value: FilterValueType, idTodolist: string) => void
    addTask: (value: string, idTodolist: string) => void
    changeTaskChecked: (tId: string, isDone: boolean, idTodolist: string) => void
    filter: FilterValueType
    idTodolist: string
    removeTodolist: (idTodolist: string) => void
    onChangeTitleTask: (tId: string, newTitle: string, idTodolist: string) => void
    onChangeTodolistTitle: (newTitle: string, idTodolist: string) => void
}

export function Todolist(props: PropsType) {

    const clickFilter = (value: FilterValueType) => {
        props.changeFilter(value, props.idTodolist);
    }

    const clickRemoveTask = (tID: string) => {
        props.removeTask(tID, props.idTodolist)
    }


    const onChangeCheckedHandler = (e: boolean, tId: string) => {
        props.changeTaskChecked(tId, e, props.idTodolist)
    }

    const clickDeleteTodoList = () => {
        props.removeTodolist(props.idTodolist)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.idTodolist)
    }

    const onChangeTodolistTitle = (newTitle: string) => {
        props.onChangeTodolistTitle(newTitle, props.idTodolist)
    }


    return <div>
        <h3><EditableSpan title={props.title} onChangeTitle={onChangeTodolistTitle}/>
            <button onClick={clickDeleteTodoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul>
            {props.tasks.map((t) => {

                const onChangeTaskTitle = (newTitle: string) => {
                    props.onChangeTitleTask(t.id, newTitle, props.idTodolist)
                }

                return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                    <input onChange={(e) => onChangeCheckedHandler(e.currentTarget.checked, t.id)} type="checkbox"
                           checked={t.isDone}/>
                    <EditableSpan title={t.title} onChangeTitle={onChangeTaskTitle}/>
                    <button onClick={() => clickRemoveTask(t.id)}>x</button>
                </li>
            })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "activeFilter" : ""} onClick={() => clickFilter('all')}>All
            </button>
            <button className={props.filter === 'active' ? "activeFilter" : ""}
                    onClick={() => clickFilter('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? "activeFilter" : ""}
                    onClick={() => clickFilter('completed')}>Completed
            </button>
        </div>
    </div>
}

