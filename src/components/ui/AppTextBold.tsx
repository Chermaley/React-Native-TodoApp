import React from 'react';
import { Text, StyleSheet } from 'react-native';

type AppTextPropTypes = {
    children: string,
    style?: Object
}

export const AppTextBold: React.FC<AppTextPropTypes> = ({children, style}) => {
    return (
        <Text style={{...styles.default, ...style}}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    default: {
        fontFamily: "roboto-bold"
    }
})