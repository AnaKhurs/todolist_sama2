import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [error, setError] = useState('')
    let [newTaskTitle, setNewTaskTitle] = useState('')

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTaskTitle(e.currentTarget.value)
    }

    const keyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            clickAddTask()
        }
    }

    const clickAddTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("error")
        }
    }

    return (
        <div>
            <input className={error ? "errorInput" : ''} value={newTaskTitle} onChange={changeInput}
                   onKeyPress={keyPressInput}/>
            <button onClick={clickAddTask}>+</button>
            <div className="errorMessage">{error}</div>
        </div>
    )
}