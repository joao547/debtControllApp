import React , { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, Animated, Keyboard, AsyncStorage, ActivityIndicator } from 'react-native';

import axios from 'axios';
import styles from './styles';

export default function Login(){

    const navigation = useNavigation();

    let body = {
        username: username,
        pass: senha
    }

    let requestOptions = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}));
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);


        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200
            })
        ]).start();
        
    }, []);

    function keyboardDidShow(){
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 55,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                toValue: 65,
                duration: 100,
            }),
        ]).start();
    }
    function keyboardDidHide(){
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 130,
                duration: 100,
            }),
            Animated.timing(logo.y, {
                toValue: 155,
                duration: 100,
            }),
        ]).start();
    }

    async function login(){
        setLoading(true);
        axios.post('https://debt-controll-api.herokuapp.com/auth',{
            username: username,
            pass: senha
        }, requestOptions).then( response => {
            setToken(response.data);
        }).catch(err => {
            alert('error: '+ err);
            setLoading(false);
        });

        
    }

    async function setToken(token){
        try {
          await AsyncStorage.setItem(
            'token',
            token
          );
          setLoading(false);
          navigation.navigate('Home');
        } catch (err) {
            console.log('error: '+ err);
        }
    }

    if(loading){
        return(
            <View style={styles.background}>
                <ActivityIndicator 
                    size='large'
                    color='#f1c40f'
                />
                <Text>Logando...</Text>
            </View>
        );
    }
    else{
        return(
            <KeyboardAvoidingView style={styles.background}>
                <View style={styles.containerLogo}>
                    <Animated.Image
                    styles={{
                        width: logo.x,
                        height: logo.y,
                    }}
                    source={require('./../../assets/logo.png')}
                    />
                </View>
                <Animated.View style={[
                    styles.container,
                    {
                        opacity: opacity,
                        transform: [
                            { translateY: offset.y}
                        ]
                    }
                    ]}>
                    <TextInput
                    style={styles.input}
                    placeholder="Username"
                    autoCorrect={false}
                    onChangeText={text => setUsername(text)}
                    defaultValue={username}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={text => setSenha(text)}
                    defaultValue={senha}
                    />

                    <TouchableOpacity 
                    style={styles.btnSubmit}
                    onPress={login}
                    >
                        <Text style={styles.textSubmit}>Acessar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnRegister}>
                        <Text style={styles.textRegister}>Criar conta</Text>
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        );
    }
}