import {createContext} from 'react';
import { InitialStateType, initialState } from './TodoState';

type TodoContextType = {
    state: InitialStateType,
    addTodo: (title: string) => void,
    removeTodo: (id: string) => void,
    changeTodoTitle: (id: string | null, title: string) => void
}
export const TodoContext = createContext<TodoContextType | undefined>(undefined);