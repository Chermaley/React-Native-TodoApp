import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';
import { AppButton } from '../components/ui/AppButton';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { ScreenCntx } from '../context/screen/screenContext';
import { TodoContext } from '../context/Todo/todoContext';
import { THEME } from '../theme';

export const MainScreen: React.FC = () => {
    const [deviceWidth, setDeviceWidth] = React.useState<number>(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
    const screenContext = React.useContext(ScreenCntx);
    const todosContext = React.useContext(TodoContext);

    if (!todosContext || !screenContext) return null

    const {changeScreen} = screenContext;
    const {state: {todos, loading, error}, addTodo, removeTodo, fetchTodos} = todosContext;

    const loadTodos = React.useCallback(async () => await fetchTodos(), [fetchTodos])

    React.useEffect(() => {
        loadTodos();
    }, [])

    React.useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width);
        }
        Dimensions.addEventListener('change', update);
        return () => {
            Dimensions.removeEventListener('change', update);
        }
    })

    if (loading) return <AppLoader />

    if (error) return (
        <View style={styles.center}>
            <AppText style={styles.error}>
                {error}
            </AppText> 
            <AppButton color={THEME.DANGER_COLOR} onPress={loadTodos}>Try again</AppButton>
        </View>
    )
        
    let content = (
        <View style={{width: deviceWidth}}>
             <FlatList data={todos}
                       keyExtractor={(item) => item.id}
                       renderItem={({item}) =>  <TodoItem setTodoId={changeScreen} onLongPress={removeTodo} item={item}/>} />
        </View>
    )
    
    if (!todos.length) {
        content = <View style={styles.imgWrap}>
                    <Image style={styles.img} 
                            source={require('../../assets/no-items.png')}
                            resizeMode="contain"/>
                  </View>
    }                        
    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        height: 300
    },
    img: {
        width: '100%',
        height: '100%'
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
});