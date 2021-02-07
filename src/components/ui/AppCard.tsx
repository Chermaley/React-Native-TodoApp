import React from "react";
import {StyleSheet, View} from "react-native";

type AppCardPropTypes = {
    children: React.ReactNode,
    style: Object
}

export const AppCard: React.FC<AppCardPropTypes> = ({children, style}) => {
    return (
        <View style={{ ...styles.default, ...style }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 20,
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {height: 2, width: 2},
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10
    }
});