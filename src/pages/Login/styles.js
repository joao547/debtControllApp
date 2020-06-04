import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#191919',
      alignItems: 'center',
      justifyContent: 'center',
      },
    containerLogo: {
      flex:1,
      justifyContent:'center',
    },
    container: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      paddingBottom: 50,
    },
    input: {
      backgroundColor: '#FFF',
      width: '90%',
      marginBottom: 15,
      color: '#222',
      height: 50,
      fontSize: 17,
      borderRadius: 7,
    },
    btnSubmit: {
      backgroundColor: '#35AAFF',
      width: '90%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7,
    },
    textSubmit: {
      color: '#FFF',
      fontSize: 18,
    },
    btnRegister: {
      marginTop: 15,
    },
    textRegister:{
      color: '#FFF',
    }
});