import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemform} from "./AddItemform";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, id: string) => void
    addNewTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    id: string
}

export const Todolist=React.memo((props: PropsType) =>{
    console.log('todo list render')

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    },[props.changeFilter,props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    },[props.changeFilter,props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    },[props.changeFilter,props.id])

    const addTask = useCallback((title: string) => {
        props.addNewTask(title, props.id)
    },[ props.addNewTask,props.id])

    const changeTodoList = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }
    const removeTodoList = (id: string) => {
        props.removeTodoList(id)
    }

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoList}/>
            <IconButton onClick={() => {
                removeTodoList(props.id)
            }}>
                <Delete fontSize="inherit"/>
            </IconButton>
        </h3>

        <AddItemform addItem={addTask}/>
        <ul>
            {
                tasksForTodolist.map(t => <Task changeStatus={props.changeStatus}
                                                 task={t}
                                                 todolistId={props.id}
                                                 removeTask={props.removeTask}
                                                 changeTaskTitle={props.changeTaskTitle}
                                                key={t.id}
                />

                )
            }
        </ul>
        <div>
            <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>
                All
            </Button>
            <Button color="primary" variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button color="secondary" variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
})


