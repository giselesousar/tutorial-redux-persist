import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/RootStackParamList';

type profileScreenProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile() {
    const navigation = useNavigation<profileScreenProp>();


    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        setNome('Lucas');
        setEmail('lucas@gmail.com');
        setTelefone('3222-2222');
    })


    return (
        <View style={styles.container}>
            <Text>Tela de perfil!</Text>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                    editable={false}
                />
            </View>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    editable={false}

                />
            </View>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    onChangeText={setTelefone}
                    value={telefone}
                    editable={false}
                />
            </View>
            <Button
                title="SAIR"
                onPress={() => navigation.navigate('Login')}
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
