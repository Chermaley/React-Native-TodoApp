import React from 'react';
import { Alert } from 'react-native';
import { TodoType } from '../../MainLayout';
import { ScreenCntx } from '../screen/screenContext';
import {TodoContext} from './todoContext';
import {actions, todoReducer} from './todoReducer';

export const initialState = {
    todos: [] as Array<TodoType>
}

export const TodoState: React.FC = ({children}) => {
    const screenContext = React.useContext(ScreenCntx);

    if (!screenContext) return null;
  
    const {changeScreen} = screenContext;

    const [state, dispatch] = React.useReducer(todoReducer, initialState)    

    const addTodo = (title: string) => dispatch(actions.addTodo(title));
    const removeTodo = (id: string) => {
        Alert.alert(
            'Delete todo',
            'Are you sure?',
            [
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                changeScreen(null);
                dispatch(actions.removeTodo(id))
                }
            },
            {
                text: 'Cancel',
                style: 'destructive',
                
            }
            ],
            { cancelable: true }
        );
        
    };
    const changeTodoTitle = (id: string | null, title: string) => dispatch(actions.changeTitle({id, title}));

    

    return <TodoContext.Provider value={{state: state, addTodo, removeTodo, changeTodoTitle}}> 
            {children}
        </TodoContext.Provider>
}

export type InitialStateType = typeof initialState