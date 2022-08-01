import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId : string
}

export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListActionType
    | ChangeTodoListFilterActionType


/*
export const todolistId1 = v1()
export const todolistId2 = v1()
*/

const initialSTate:Array<TodoListType> = [/*
    {id: todolistId1, title: "What to learn", filter: "active"},
    {id: todolistId2, title: "What to buy", filter: "completed"}
*/
]


export const todolistsReducer = (state: Array<TodoListType> = initialSTate, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" :
            return [...state.filter(tl => tl.id != action.id)]
        case  'ADD-TODOLIST' : {
            let todolist: TodoListType = {
                id: action.todolistId,
                filter: "all",
                title: action.title
            }
            return ([todolist,...state ])
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist)
                todolist.title = action.title;
            return ([...state])

        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist)
                todolist.filter = action.filter;
                return [...state]

        }
        default:
            return state
    }

}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolistTitle: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: todolistTitle ,todolistId:v1()}
}
export const changeTodolistAC = (todolistId: string,todolistTitle: string): ChangeTodoListActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: todolistTitle, id :todolistId }
}
export const changeTodolistFilterAC = (todolistFilter: FilterValuesType,todolistId: string): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id :todolistId , filter :todolistFilter }
}
