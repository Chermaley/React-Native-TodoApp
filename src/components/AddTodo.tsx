import React from 'react';
import {View, StyleSheet, TextInput, Alert, Keyboard} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { THEME } from '../theme';

type AddTodoPropTypes = {
    onSubmit: (text: string) => void
}

export const AddTodo: React.FC<AddTodoPropTypes> = ({onSubmit}) => {
    const [inputValue, setInputValue] = React.useState('');

    const pressHandler = () => {
        if (inputValue.trim()) {
            onSubmit(inputValue);
            setInputValue('');
            Keyboard.dismiss();
        } else {
            Alert.alert('Please, type something')
        }
    }

    const inputHandler = (text: string) => {
        setInputValue(text)
    }

    return (
        <View style={styles.wrapper}>
            <TextInput onChangeText={inputHandler}
                       style={styles.input}
                       value={inputValue}
                       autoCorrect={false}
                       autoCapitalize="none" 
                       placeholder="Type something"/>
            <AntDesign.Button onPress={pressHandler} name="pluscircle">
                Add
            </AntDesign.Button>           
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    input: {
        padding: 10,
        width: "70%",
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
});