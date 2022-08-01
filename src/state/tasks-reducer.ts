import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    taskTitle: string
    todolistId: string
}

export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}

type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusType |
    ChangeTaskTitleType |
    AddTodoListActionType |
    RemoveTodoListActionType

const initialState:TasksStateType = {/*
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
    ]*/
}


export const tasksReducer = (state:TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter((t: any) => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy

            /* return {...state[action.todolistId].filter((t:any)=> t.id !== action.taskId) }*/
        }
        case "ADD-TASK" : {

            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.taskTitle, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy

            /* return ([...state[action.todolistId]  ,newTask ])*/
        }
        case "CHANGE-TASK-STATUS" : {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t=>t.id ===action.taskId ?
                {...t, isDone : action.isDone} :
            t)
            return ({...state})
        }

        case "CHANGE-TASK-TITLE" : {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t=>t.id ===action.taskId ?
                {...t, title : action.title} :
                t)

            return ({...state})
        }
        case "ADD-TODOLIST" :{
            const stateCopy = {...state}

            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case 'REMOVE-TODOLIST' :{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
           return state
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
