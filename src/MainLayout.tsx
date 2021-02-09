import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from './components/Navbar';
import { ScreenCntx } from './context/screen/screenContext';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { THEME } from './theme';


export type TodoType = {
    id: string,
    title: string
  }

export const MainLayout: React.FC = () => {
    const screenContext = React.useContext(ScreenCntx);

    if (!screenContext) return null;
  
    const {state: {screen}} = screenContext;

    return (
    <View >
      <Navbar title={"Todo"}/>
      <View style={styles.container}>
        {screen ? <TodoScreen /> : <MainScreen/>}
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: THEME.PADDING_HORIZONTAL,
      paddingVertical: 20
    },
  });