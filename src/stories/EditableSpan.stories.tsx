import React from 'react'
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const editableSpanCallback = action("EditableSpan Changed")


export const EditableSpanExammple = (props: any) => {
    return <EditableSpan title={'start value'} onChange={editableSpanCallback}/>

}