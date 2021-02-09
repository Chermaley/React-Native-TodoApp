import { InitialStateType } from "./ScreenState"

export const screenReducer = (state: InitialStateType, action: ActionsType) => {
    switch(action.type) {
        case "SET_SCREEN": 
            return {
                ...state,
                screen: action.payload
            }
        default: 
            return state
    }
}

export const actions = {
    setScreen: (payload: string | null) => ({type: "SET_SCREEN", payload} as const)
}

type InferActionsTypes<T> = T extends {[keys:string]: (...args: any[]) => infer U} ? U : never

type ActionsType = InferActionsTypes<typeof actions>;