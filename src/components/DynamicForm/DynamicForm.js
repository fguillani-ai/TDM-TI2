import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

function Comentarios(){
    const [comentario, setComentario]= useState ('')
    function onSubmit(){
        console.log(comentario);
    }
    return(
        <View style={styles.container}>
                <Text style={styles.titulo}>Login</Text>
                <TextInput style={styles.texto}
                    keyboardType='default'
                    placeholder='escriba su comentario'
                    onChangeText={text=>setComentario(text)}
                    value={comentario}/>
                <Pressable onPress={()=> onSubmit()} style={styles.boton}>
                  <Text style={styles.textoBoton}>Enviar comentario</Text>
                </Pressable>
                <View>
                    <Text>{comentario}</Text>
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

  textoBoton:{
    textAlign:'center'
  }
});

export default Comentarios