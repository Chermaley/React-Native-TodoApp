import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { TodoType } from '../MainLayout';
import { AppText } from './ui/AppText';


type TodoItemPropTypes = {
    item: TodoType,
    onLongPress: (id: string) => void,
    setTodoId: (id: string) => void
}

export const TodoItem: React.FC<TodoItemPropTypes> = ({item, onLongPress, setTodoId}) => {
    
    return (
        <TouchableOpacity activeOpacity={0.5} 
                          onLongPress={() => onLongPress(item.id)}
                          onPress={() => {setTodoId(item.id)}}>
            <View style={styles.todo}>
                <AppText>{item.title}</AppText>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10
    }
});