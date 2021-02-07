import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { TodoType } from '../../App';
import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';
import { THEME } from '../theme';

type MainScreenPropTypes = {
    addTodo: (title: string) => void,
    removeTodo: (id: string) => void,
    openTodo: (id: string) => void,
    todos: TodoType[]
}

export const MainScreen: React.FC<MainScreenPropTypes> = ({addTodo, todos, removeTodo, openTodo}) => {
    const [deviceWidth, setDeviceWidth] = React.useState<number>(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

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

    let content = (
        <View style={{width: deviceWidth}}>
             <FlatList data={todos}
                       keyExtractor={(item) => item.id}
                       renderItem={({item}) =>  <TodoItem setTodoId={openTodo} onLongPress={removeTodo} item={item}/>} />
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
    }
});