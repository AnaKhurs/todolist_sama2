import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle:string)=> void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.currentTarget.value
        setTitle(newTitle)
    }

    return (
        editMode
            ? <input value={title} onBlur={activateViewMode} onChange={changeTitleHandler} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}