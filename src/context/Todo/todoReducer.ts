import { InitialStateType } from "./todoState";

export const todoReducer = (state: InitialStateType, action: ActionsType) => {
    switch(action.type) {
        case "ADD_TODO": 
            return {
                ...state,
                todos: [...state.todos, {
                    id: Date.now().toString(),
                    title: action.payload
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
        default: 
            return state    
    }
}

export const actions = {
    addTodo: (payload: string) => ({type: "ADD_TODO", payload} as const),
    removeTodo: (payload: string) => ({type: "REMOVE_TODO", payload} as const),
    changeTitle: (payload: {id: string | null, title: string}) => ({type: "CHANGE_TODO_TITLE", payload} as const)
}

type InferActionsTypes<T> = T extends {[keys:string]: (...args: any[]) => infer U} ? U : never

type ActionsType = InferActionsTypes<typeof actions>;