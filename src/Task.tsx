import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id,props.changeTaskTitle, props.todolistId])


    return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}
            inputProps={{'aria-label': 'controlled'}}
        />
        < EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={() => {
            onClickHandler()
        }}>
            <Delete fontSize="inherit"/>
        </IconButton>
    </li>
})