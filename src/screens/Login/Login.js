import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {auth} from '../../firebase/Config';
import { useState } from 'react';

function Login(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  function onSubmit(){
    if(!email.includes('@')){
      setLoginError('Email mal formateado');
    } 
    else if(password.length < 6){
      setLoginError('La contraseña debe tener minimo de 6 caracteres');
    } 
    else {
    auth.signInWithEmailAndPassword(email, password)
      .then(response => { props.navigation.navigate('HomeMenu')})
      .catch(error => {setLoginError('Credenciales incorrectas')})
    }
  }

  function register (){
    props.navigation.navigate('Register')
  }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>
            <TextInput style={styles.texto}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text=>setEmail(text)}
                value={email}/>
            <TextInput style={styles.texto}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text=>setPassword(text)}
                value={password}/>
            <Pressable onPress={()=> onSubmit()} style={styles.boton}>
              <Text style={styles.textoBoton}>Entrar a la app</Text>
            </Pressable>
            <Pressable onPress={()=> register()} style={styles.botonN}>
              <Text style={styles.textoBoton}>Necesito crear una cuenta</Text>
            </Pressable>
            <View>
              <Text style={styles.textoError}>{loginError}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    padding:20
  },

  titulo:{
    fontSize:35,
    fontWeight:'bold',
    marginBottom:15
  },

  texto:{
    marginBottom:20
  },

  boton:{
    backgroundColor:'#57B8E8',
    padding:15,
    borderRadius:5
  },

  botonN:{
    backgroundColor:'#e8a957ff',
    padding:15,
    borderRadius:5
  },

  textoBoton:{
    textAlign:'center'
  },

  textoError:{
    color: 'red'
  }
});

export default Login