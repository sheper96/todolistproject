import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemform} from "./AddItemform";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('app render')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType,Array<TodoListType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)




    const removeTask=useCallback((id: string, todolistId: string)=> {
        const action = removeTaskAC(id,todolistId)
        dispatch(action);

    },[])

    const addNewTask=useCallback((title: string, todolistId: string) =>{
        const action = addTaskAC(title,todolistId)
        dispatch(action);

    },[dispatch])

    const changeStatus=useCallback((taskId: string, isDone: boolean, todolistId: string)=> {
        const action = changeTaskStatusAC(taskId,isDone,todolistId)
        dispatch(action);
           },[dispatch])

    const changeTaskTitle=useCallback((taskId: string, title: string, todolistId: string)=> {
        const action = changeTaskTitleAC(taskId,title,todolistId)
        dispatch(action);
    },[dispatch])


    const changeFilter=useCallback((value: FilterValuesType, todolistId: string)=> {
        const action = changeTodolistFilterAC(value,todolistId)
        dispatch(action);
    },[dispatch])

    const changeTodoListTitle=useCallback((id: string, newTitle: string)=> {
        const action = changeTodolistAC(id,newTitle)
        dispatch(action);

    },[dispatch])

    const removeTodoList=useCallback((id: string)=> {
        const action = removeTodolistAC(id)
        dispatch(action);

    },[dispatch])

    const addTodoList=useCallback((title: string) =>{
        const action = addTodolistAC(title)
        dispatch(action);
    },[dispatch])
    return (

        <div className="App">
            <AppBar position="static">

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemform addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {

                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];


                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              removeTodoList={removeTodoList}
                                              changeFilter={changeFilter}
                                              addNewTask={addNewTask}
                                              changeStatus={changeStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodoListTitle={changeTodoListTitle}
                                              filter={tl.filter}
                                              id={tl.id}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
