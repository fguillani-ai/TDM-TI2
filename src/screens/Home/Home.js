import { Pressable, FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

function Home(props){ 

  function comentar(postId){
    props.navigation.navigate('Comments', { id: postId });
  }

  function likear(id, likesArray){
    const emailLogueado = auth.currentUser.email;
    if(likesArray && likesArray.includes(emailLogueado)){
      db.collection('posts')
        .doc(id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(emailLogueado)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      db.collection('posts')
        .doc(id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(emailLogueado)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
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
                  <Pressable style={styles.iconoBoton} onPress={() => likear(item.id, item.data.likes)}>
                    <FontAwesome 
                      name={item.data.likes && item.data.likes.includes(auth.currentUser.email) ? "heart" : "heart-o"} 
                      size={24} 
                      color="red" 
                    />
                  </Pressable>
                  
                  <Pressable style={styles.iconoBoton} onPress={() => comentar(item.id)}>
                     <FontAwesome name="comment-o" size={24} color="black" />
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
  iconoBoton:{
    padding:8
  },
  textoBoton:{
    textAlign:'center',
    fontWeight:'bold'
  }
});

export default Home;