import React from 'react'
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: "Task Component",
    component: Task
}

const changeStatusCallback = action("Status Changed")
const removeTaskCallback = action("Task removed")
const changeTaskTitleCallback = action("Task Title Changed")


export const TaskBaseExammple = (props: any) => {
    return <div>
    <Task changeStatus={changeStatusCallback}
                 task={{id: '1', isDone: true, title: "CSS"}}
                 todolistId={'todoListId1'}
                 removeTask={removeTaskCallback}
                 changeTaskTitle={changeTaskTitleCallback}
    />
    <Task changeStatus={changeStatusCallback}
          task={{id: '2', isDone: false, title: "JS"}}
          todolistId={'todoListId2'}
          removeTask={removeTaskCallback}
          changeTaskTitle={changeTaskTitleCallback}
    />
    </div>
}