import React from 'react';
import { Alert } from 'react-native';
import { TodoType } from '../../MainLayout';
import { ScreenCntx } from '../screen/screenContext';
import {TodoContext} from './todoContext';
import {actions, todoReducer} from './todoReducer';

export const initialState = {
    todos: [] as Array<TodoType>,
    loading: false,
    error: null as string | null 
}

type AddTodoResponseType = {
    name: string
}

export const TodoState: React.FC = ({children}) => {
    const screenContext = React.useContext(ScreenCntx);

    if (!screenContext) return null;
  
    const {changeScreen} = screenContext;

    const [state, dispatch] = React.useReducer(todoReducer, initialState)    

    const addTodo = async (title: string) => {
        const response = await fetch('https://rn-todo-app-13fc9-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title })
        });
        
        const data: AddTodoResponseType = await response.json();

        dispatch(actions.addTodo({id: data.name, title}));
    };
    
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
    
    const fetchTodos = async () => {
        const response = await fetch('https://rn-todo-app-13fc9-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        console.log(data);
        const todos: TodoType[] = Object.keys(data).map(key => ({...data[key], id: key}))
        dispatch(actions.fetchTodos(todos));
    }

    const changeTodoTitle = (id: string | null, title: string) => dispatch(actions.changeTitle({id, title}));

    const showLoader = (payload: boolean) => dispatch(actions.showLoader(payload))
    
    const showError = (error: string) => dispatch(actions.showError(error));

    const clearError = () => dispatch(actions.clearError());

    return <TodoContext.Provider value={{state: state,
                                            addTodo,
                                            removeTodo,
                                            changeTodoTitle,
                                            fetchTodos}}> 
            {children}
        </TodoContext.Provider>
}

export type InitialStateType = typeof initialState