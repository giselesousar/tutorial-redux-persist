import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/RootStackParamList';
import api from '../../services/api';
import { User } from '../../models/user'
import { AxiosError, AxiosResponse } from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setUserAction } from '../../store/reducers/user/actions';

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const navigation = useNavigation<loginScreenProp>();

    const user = useSelector((state: any) => state.user);

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    }

    const handleLogin = () => {
        api.get('users')
            .then((res: AxiosResponse) => {
                let user: User[] = res.data.filter((user: User) => user.email == email && user.password == password);
                if(user.length > 0) {
                    dispatch(setUserAction({
                        name: user[0].name,
                        email: user[0].email,
                        phone: user[0].phone
                    }))
                    navigateToProfile();
                } else {
                    Alert.alert('Email or password incorrect')
                }
                
            })
            .catch((err: AxiosError) => Alert.alert(err.message));
    }


    return (
        <View style={styles.container}>

            <Text>Tela de login!</Text>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Digite o usuário'
                />
            </View>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                    placeholder='Digite a senha'
                />
            </View>
            <View style={styles.inputBox}>
                <Button
                    title="FAZER LOGIN"
                    onPress={handleLogin}
                />
            </View>

            <Text>Name: { user.name }</Text>
            <Text>Email: { user.email }</Text>
            <Text>Phone: { user.phone }</Text>

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
