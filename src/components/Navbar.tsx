import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { THEME } from '../theme';
import { AppTextBold } from './ui/AppTextBold';

type NavbarPropTypes = {
    title: string
}

export const Navbar: React.FC<NavbarPropTypes> = ({title}) => {
    return (
        <View style={{...styles.navbar, ...Platform.select({
            ios: styles.navBarIos, android: styles.navBarAndroid
        })}}>
            <AppTextBold style={styles.text}>{title}</AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 10
    },
    navBarAndroid: {
        backgroundColor: THEME.MAIN_COLOR,
    },
    navBarIos: {
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1
    },
    text: {
        fontSize: 20,
        color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'
    }
});