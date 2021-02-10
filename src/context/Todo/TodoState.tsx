import React from 'react';
import { Alert } from 'react-native';
import { Http } from '../../http';
import { TodoType } from '../../MainLayout';
import { ScreenCntx } from '../screen/screenContext';
import {TodoContext} from './todoContext';
import {actions, todoReducer} from './todoReducer';

export const initialState = {
    todos: [] as Array<TodoType>,
    loading: false,
    error: null as string | null 
}


export const TodoState: React.FC = ({children}) => {
    const screenContext = React.useContext(ScreenCntx);

    if (!screenContext) return null;
  
    const {changeScreen} = screenContext;

    const [state, dispatch] = React.useReducer(todoReducer, initialState)    

    const addTodo = async (title: string) => {
        clearError();
        try {
            const data = await Http.post('https://rn-todo-app-13fc9-default-rtdb.europe-west1.firebasedatabase.app/todos.json', title)
            dispatch(actions.addTodo({id: data.name, title}));
        } catch (e) {
            showError('Something going wrong')
        }
    };
    
    const removeTodo = (id: string) => {
        Alert.alert(
            'Delete todo',
            'Are you sure?',
            [
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await Http.delete(`https://rn-todo-app-13fc9-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`);
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

    const changeTodoTitle = async (id: string | null, title: string) => {
        try{
           const res =  await Http.patch(`https://rn-todo-app-13fc9-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {title})
            console.log(res);
            
            dispatch(actions.changeTitle({id, title}));
        } catch (e) {
            showError("something going wrong...");
            console.log(e); 
        }
        
    }

    const showLoader = (payload: boolean) => dispatch(actions.showLoader(payload))
    
    const showError = (error: string) => dispatch(actions.showError(error));

    const clearError = () => dispatch(actions.clearError());

    const fetchTodos = async () => {
        showLoader(true);
        clearError();
        try {
            const data = await Http.get('https://rn-todo-app-13fc9-default-rtdb.europe-west1.firebasedatabase.app/todos.json');
            
            if (!data) return null
            
            const todos = Object.keys(data).map(key => ({...data[key], id: key}))
            console.log(data);
            
            dispatch(actions.fetchTodos(todos));
        } catch(e) {
            showError("something going wrong...");
            console.log(e); 
        } finally {
            showLoader(false);
        }
    }

    return <TodoContext.Provider value={{state: state, addTodo, removeTodo, changeTodoTitle, fetchTodos}}> 
            {children}
        </TodoContext.Provider>
}

export type InitialStateType = typeof initialState