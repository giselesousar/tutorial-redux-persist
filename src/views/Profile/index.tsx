import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/RootStackParamList';

import { useDispatch, useSelector } from 'react-redux';
import { clearUserAction } from '../../store/reducers/user/actions'

type profileScreenProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile() {
    const navigation = useNavigation<profileScreenProp>();

    const user = useSelector((state: any) => state.user);

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text>Tela de perfil!</Text>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    value={user.name}
                    editable={false}
                />
            </View>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    value={user.email}
                    editable={false}

                />
            </View>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    value={user.phone}
                    editable={false}
                />
            </View>
            <Button
                title="SAIR"
                onPress={() => {
                    dispatch(clearUserAction());
                    navigation.navigate('Login');
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    inputBox: {
        flexDirection: 'row'
    }
});
