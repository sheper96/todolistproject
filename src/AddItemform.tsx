import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void

}

export const AddItemform= React.memo((props: AddItemFormPropsType)=> {
    console.log('item form render')
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addNewTask()
        }
    }

    const addNewTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("")
        } else setError('title is required')

    }
    return (
        <div>
            <TextField value={newTaskTitle}
                       variant={"outlined"}
                       label ={"Type Value"}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                       error = {!!error}
                       helperText = {error}
            />
            <IconButton onClick={addNewTask}  color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
})