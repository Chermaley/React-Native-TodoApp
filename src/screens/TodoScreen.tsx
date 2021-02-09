import React from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import { EditModal } from '../components/EditModal';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';
import { AppTextBold } from '../components/ui/AppTextBold';
import { THEME } from '../theme';
import { ScreenCntx } from '../context/screen/screenContext';
import { TodoContext } from '../context/Todo/todoContext';


export const TodoScreen: React.FC = () => {
    const [modal, setModal] = React.useState(false);
    
    const screenContext = React.useContext(ScreenCntx);
    const todosContext = React.useContext(TodoContext);

    if (!todosContext || !screenContext) return null

    const {state: screen, changeScreen} = screenContext;
    const {changeTodoTitle, removeTodo, state: {todos}} = todosContext;

    const todo = todos.find(t => t.id === screen.screen);
 
    if (!todo) return null

    const onChangeHandler = (title: string) => {        
        if (title.trim().length > 3) {
            setModal(false);
            changeTodoTitle(todo.id, title);
        } else {
            Alert.alert(
                'Please type a new title'
            )
        }
    }

    return (
        <View>
            <EditModal value={todo.title} 
                       visible={modal} 
                       onClose={() => setModal(false)}
                       onConfirm={onChangeHandler}/>

            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo?.title}</AppTextBold>
                <AppButton color={THEME.MAIN_COLOR} onPress={() => setModal(true)} >
                    <FontAwesome name="edit" size={20}/>
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
                        <AntDesign name="back" color="#fff" size={20}/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton onPress={() => removeTodo(todo.id)} color={THEME.DANGER_COLOR}>
                        <FontAwesome name="remove" size={20}/>
                    </AppButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    card: {
        marginBottom: 20
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20
    }
});