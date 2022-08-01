import {AddItemform} from "./AddItemform";
import React from 'react'

export default {
    title : "AddItemForm Component",
    component : AddItemform
}


export const AddItemFormBaseExammple = (props:any)=>{
        return<AddItemform addItem={(title:string)=>alert(title)}/>
}