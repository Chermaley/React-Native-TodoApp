import React from 'react';
import {ScreenCntx} from './screenContext';
import { screenReducer, actions } from './screenReducer';

export const initialState = {
    screen: null as string | null
}

export const ScreenState: React.FC = ({children}) => {
    const [state, dispatch] = React.useReducer(screenReducer, initialState);
    
    const changeScreen = (id: string | null) => dispatch(actions.setScreen(id))

    return <ScreenCntx.Provider value={{state, changeScreen}}>{children}</ScreenCntx.Provider>
}

export type InitialStateType = typeof initialState