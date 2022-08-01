import React from 'react'
import {AddItemform} from "../AddItemform";
import {action} from "@storybook/addon-actions";

export default {
    title : "AddItemForm Component",
    component : AddItemform
}

const callback = action("Button add was pressed")


export const AddItemFormBaseExammple = (props:any)=>{
        return<AddItemform addItem={callback}/>
}