import React from 'react';
import {View, StyleSheet, TextInput, Button, Modal} from 'react-native';
import { THEME } from '../theme';
import { AppButton } from './ui/AppButton';

type EditModalPropTypes = {
    visible: boolean,
    value: string,
    onClose: () => void,
    onConfirm: (title: string) => void
}

export const EditModal: React.FC<EditModalPropTypes> = ({visible, onClose, value, onConfirm}) => {
    const [title, setTitle] = React.useState(value);
    
    const ConfirmHandler = () => {
        onConfirm(title)
    }

    const cancelHandler = () => {
        setTitle(value);
        onClose();
    }

    return (
        <Modal animationType="slide" visible={visible}>
            <View style={styles.wrap}>
                <TextInput style={styles.input} 
                           value={title}
                           onChangeText={setTitle}/>
                <View style={styles.buttons}>
                    <AppButton color={THEME.GREY_COLOR} onPress={ConfirmHandler}>
                        CONFIRM
                    </AppButton>
                    <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>
                        CANCEL
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    wrap: {
        justifyContent: "center",
        alignItems: "center", 
        flex: 1
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: "80%"
    },
    buttons: {
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    }
});