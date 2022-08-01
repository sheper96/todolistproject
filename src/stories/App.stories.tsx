import React from 'react'
import {Task} from "../Task";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: "App Component",
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExammple = (props: any) => {
    return <AppWithRedux/>
}