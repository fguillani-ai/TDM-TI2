import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/config';

function Profile(props){
  
  function eliminarPost(id){
    db.collection('posts')
      .doc(id)
      .delete()
      .catch(error => {
        console.log(error)
      })
  }

  const [userName, setUserName] = useState('');
  const [misPosts, setMisPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posteos = [];
        docs.forEach(doc => {
          if(doc.data().email === auth.currentUser.email && posteos.length < 3){
            posteos.push({
              id: doc.id,
              data: doc.data()
            })
          }
        })

        setMisPosts(posteos);
      })
  }, [])

  useEffect(() => {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          setUserName(doc.data().userName)
        })
      })
  }, [])
  function screen(){
    auth.signOut()
    .then(() => {props.navigation.navigate('Login')})
    .catch(error => {console.log(error)})
  }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>{userName}</Text>
            <Text style={styles.email}>Usuario logueado: {auth.currentUser.email}</Text>
            <Text style={styles.subtitulo}>Ultimos posteos:</Text>
            <FlatList
              data={misPosts}
              keyExtractor={item => item.id}
              renderItem={({item}) => 
                <View style={styles.post}>
                  <Text style={styles.postEmail}>{item.data.email}</Text>
                  <Text style={styles.postTexto}>{item.data.descripcionPost}</Text>
                  <Pressable style={styles.botonEliminar} onPress={() => eliminarPost(item.id)}>
                    <Text style={styles.textoBoton}>Eliminar posteo</Text>
                  </Pressable>
                </View>
              }
            />           
            <Pressable style={styles.boton} onPress={()=> screen()}>
              <Text style={styles.textoBoton}>Desloguearse</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },

  titulo:{
    fontWeight:'bold',
    fontSize:30,
    marginTop:30
  },

  email:{
    fontSize:15,
    marginBottom:25
  },

  subtitulo:{
    fontWeight:'bold',
    fontSize:24,
    marginBottom:15
  },

  post:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:8,
    padding:12,
    marginBottom:12
  },

  postEmail:{
    fontSize:12,
    marginBottom:5
  },

  postTexto:{
    fontSize:16
  },

  botonEliminar:{
    backgroundColor:'orange',
    padding:8,
    borderRadius:5,
    marginTop:10,
    alignSelf:'flex-end'
  },

  boton:{
    backgroundColor:'orange',
    width:'80%',
    padding:15,
    borderRadius:8,
    alignSelf:'center',
    marginTop:20,
    marginBottom:20
  },

  textoBoton:{
    textAlign:'center',
    fontWeight:'bold'
  }
});

export default Profile