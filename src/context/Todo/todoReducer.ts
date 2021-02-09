import { TodoType } from "../../MainLayout";
import { InitialStateType } from "./todoState";

export const todoReducer = (state: InitialStateType, action: ActionsType) => {
    switch(action.type) {
        case "ADD_TODO": 
            return {
                ...state,
                todos: [...state.todos, {
                    id: action.payload.id,
                    title: action.payload.title
                }] 
            }
        case "REMOVE_TODO": 
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.payload)
            }
        case "CHANGE_TODO_TITLE": 
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo.id === action.payload.id) todo.title = action.payload.title;
                    return todo
                })
            }
        case "SHOW_LOADER":
            return {
                ...state,
                loading: action.payload
            }
        case "CLEAR_ERROR": 
            return {
                ...state,
                error: null
            }
        case "SHOW_ERROR": 
            return {
                ...state,
                error: action.payload
            }    
        case "FETCH_TODOS": 
            return {
               ...state,
               todos: action.payload 
            }    
        default: 
            return state    
    }
}

export const actions = {
    addTodo: (payload: {title: string, id: string}) => ({type: "ADD_TODO", payload} as const),
    removeTodo: (payload: string) => ({type: "REMOVE_TODO", payload} as const),
    changeTitle: (payload: {id: string | null, title: string}) => ({type: "CHANGE_TODO_TITLE", payload} as const),
    showLoader: (payload: boolean) => ({type:"SHOW_LOADER", payload} as const),
    clearError: () => ({type: "CLEAR_ERROR"} as const),
    showError: (payload: string) => ({type: "SHOW_ERROR", payload} as const),
    fetchTodos: (payload: TodoType[]) => ({type: "FETCH_TODOS", payload} as const)
}

type InferActionsTypes<T> = T extends {[keys:string]: (...args: any[]) => infer U} ? U : never

type ActionsType = InferActionsTypes<typeof actions>;