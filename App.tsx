import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';
import { THEME } from './src/theme';

export type TodoType = {
  id: string,
  title: string
}

async function loadApplication () {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = React.useState(false)
  const [todos, setTodos] = React.useState<TodoType[]>([{
    id: '2', title: "Убивать"
  }]);
  const [todoId, setTodoId] = React.useState<string | null>(null);

  if (!isReady) return <AppLoading startAsync={loadApplication}
                                   onFinish={() => setIsReady(true)}
                                   onError={() => console.log('OOOPS')
                                   }/>

  const addTodo = (title: string) => {
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title
    }])
  }

  const removeTodo = (id: string) => {
    Alert.alert(
      'Delete todo',
      'Are you sure?',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTodoId(null);
            setTodos(prev =>  prev.filter(t => t.id !== id));
          }
        },
        {
          text: 'Cancel',
          style: 'destructive',
          
        }
      ],
      { cancelable: true }
    );
    
  }

  const changeTitle = (id: string, title: string) => {
    setTodos(prev => prev.map(todo => {
      if(todo.id === id) todo.title = title;
      return todo
    }))
  }

  let content = <MainScreen openTodo={setTodoId} addTodo={addTodo} removeTodo={removeTodo} todos={todos}/>

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    if (selectedTodo) {
      content = <TodoScreen goBack={() => setTodoId(null)} 
                            todo={selectedTodo}
                            onRemove={removeTodo}
                            onChangeTitle={changeTitle}/>
    }
  }

  return (
    <View >
      <Navbar title={"Todo"}/>
      <View style={styles.container} >
        {content}
      </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  },
});
