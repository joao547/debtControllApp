import React , { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TouchableOpacity, Text, AsyncStorage, ActivityIndicator } from 'react-native';

import axios from 'axios';
import styles from './styles';

export default function Home(){
    
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getToken();
    }, []);
    

    async function getToken(){
        await AsyncStorage.getItem('token').then((value) => {
            setToken(value);
            getUser(value);
        });
    }

    async function getUser(value){
            const headers = {
                'Authorization': value
            }
    
            
            axios.get("https://debt-controll-api.herokuapp.com/api/user", {
            headers: headers
            }).then(function (response) {
                setUser(response.data);
                setLoading(false);
            }).catch(error => {
                console.log(error);
            });
    }  

    if(loading){
        return(
            <View style={styles.containerLoading}>
                <ActivityIndicator 
                    size='large'
                    color='#f1c40f'
                />
                <Text>Aguarde, carregando os dados...</Text>
            </View>
        );
    }
    else{
        return(
            <View style={styles.container}>
                <View style={ styles.header}>
                    <Image source={require('./../../assets/logo.png')}/>
                    <Text style={styles.headerText}>
                        Logado como <Text style={styles.headerTextBold}>{user.nome}</Text>.
                    </Text>
                </View>

                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            </View>
        );
    }
}