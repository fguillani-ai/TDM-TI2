import { Pressable, FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase/Config'; 
import Post from '../../components/Post/Post';

function Home(props){ 

  function comentar(postId){
    props.navigation.navigate('Comments', { id: postId });
  }

  function likear(id, likesArray){
    const emailLogueado = auth.currentUser.email;
        let listaLikes = []; 
        if (likesArray) {
      listaLikes = likesArray;
    }
    if(listaLikes.includes(emailLogueado)){
      const likesActualizados = listaLikes.filter(email => email !== emailLogueado);
      db.collection('posts').doc(id).update({
        likes: likesActualizados
      });
    } else {
      db.collection('posts').doc(id).update({
        likes: [...listaLikes, emailLogueado]
      });
    }
  }

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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
  
  return(
      <View style={styles.container}>
          <Text style={styles.titulo}>Home</Text>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => 
              <View style={styles.post}>
                <Text style={styles.postEmail}>{item.data.email}</Text>
                <Text style={styles.postTexto}>{item.data.descripcionPost}</Text>
                
                <Text style={styles.postEmail}>
                  Likes: {item.data.likes ? item.data.likes.length : 0}
                </Text>

                <View style={styles.botones}>
                  <Pressable style={styles.botonEliminar} onPress={() => likear(item.id, item.data.likes)}>
                    <Text style={styles.textoBoton}>
                      {item.data.likes && item.data.likes.includes(auth.currentUser.email) ? "Sacar Like" : "Like"}
                    </Text>
                  </Pressable>
                  
                  <Pressable style={styles.botonEliminar} onPress={() => comentar(item.id)}>
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
    marginBottom:5,
    color: '#666'
  },
  postTexto:{
    fontSize:16,
    marginBottom: 5
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
    width: '45%'
  },
  textoBoton:{
    textAlign:'center',
    fontWeight:'bold'
  }
});

export default Home;