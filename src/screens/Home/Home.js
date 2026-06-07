import { Pressable, FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import Post from '../../components/Post/Post';

function Home(){

  function comentar(){
    //codigo comentar
  }

  function likear(){
    //codigo likear
  }

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection('posts').onSnapshot(
        docs => {
            let posteos = [];

            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setPosts(posteos);
        }
    )
  }, [])
  console.log(posts);
  
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>HOME</Text>
            <FlatList
              data={posts}
              renderItem={({item}) => 
                <View style={styles.post}>
                  <Text style={styles.postEmail}>{item.data.email}</Text>
                  <Text style={styles.postTexto}>{item.data.descripcionPost}</Text>
                  <View style={styles.botones}>
                    <Pressable style={styles.botonEliminar} onPress={() => likear()}>
                      <Text style={styles.textoBoton}>Like (icon)</Text>
                    </Pressable>
                    <Pressable style={styles.botonEliminar} onPress={() => comentar()}>
                      <Text style={styles.textoBoton}>Comentar</Text>
                    </Pressable>
                  </View>
                </View>}
            />
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

  botones:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10
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

export default Home