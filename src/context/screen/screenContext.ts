import React from 'react';
import { InitialStateType } from './ScreenState';

type ScreenCntxType = {
    state: InitialStateType,
    changeScreen: (id: string | null) => void
}

export const ScreenCntx = React.createContext<ScreenCntxType | undefined>(undefined);