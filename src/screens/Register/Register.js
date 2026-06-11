import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {auth, db} from '../../firebase/config'
import { useState } from 'react';



function Register(props){
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  
  function onSubmit(){
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        db.collection('users').add({
          email: email,
          userName: userName,
          createdAt: Date.now()
        })
        .then(() => {
          props.navigation.navigate('Login')
        })
        .catch(error => {
          setRegisterError('Fallo al guardar los datos')
        })
      })
      .catch(error => {
        setRegisterError('Fallo en el registro')
      })
  }
  function login (){
    props.navigation.navigate('Login')
  }
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>REGISTER</Text>
            <TextInput style={styles.texto}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text=>setEmail(text)}
                value={email}/>
            <TextInput style={styles.texto}
                keyboardType='default'
                placeholder='user name'
                onChangeText={text=>setUserName(text)}
                value={userName}/>
            <TextInput style={styles.texto}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text=>setPassword(text)}
                value={password}/>
            <Pressable onPress={()=> onSubmit()} style={styles.boton}>
              <Text style={styles.textoBoton}>Registrarse</Text>
            </Pressable>
            <Pressable onPress={()=> login()} style={styles.botonN}>
              <Text style={styles.textoBoton}>Ya tengo cuenta</Text>
            </Pressable>
            <View>
              <Text style={styles.textoError}>{registerError}</Text>
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

export default Register