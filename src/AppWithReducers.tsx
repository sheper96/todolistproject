import React, {useReducer, useState} from 'react';
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

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}

    ])



    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ]
        }
    );


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id,todolistId)
        dispatchToTasksReducer(action);

    }

    function addNewTask(title: string, todolistId: string) {
        const action = addTaskAC(title,todolistId)
        dispatchToTasksReducer(action);

    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId,isDone,todolistId)
        dispatchToTasksReducer(action);
           }

    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId,title,todolistId)
        dispatchToTasksReducer(action);
             }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(value,todolistId)
        dispatchToTodoListsReducer(action);
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = changeTodolistAC(id,newTitle)
        dispatchToTodoListsReducer(action);

    }

    function removeTodoList(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTodoListsReducer(action);

    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodoListsReducer(action);
        dispatchToTasksReducer(action);
    }
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

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }
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

export default AppWithReducers;
