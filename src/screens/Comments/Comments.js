import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/Config';

function Comments(props) {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
    const postId = props.route.params.id;

  useEffect(() => {
    db.collection('posts').doc(postId).onSnapshot((doc) => {
      if (doc.exists && doc.data().comentarios) {
        setComentarios(doc.data().comentarios);
      }
    });
  }, []);

  function enviarComentario() {
    if (nuevoComentario === '') {
      return; 
    }
    const comentarioAEnviar = {
      email: auth.currentUser.email,
      texto: nuevoComentario,
      createdAt: Date.now() 
    };

    db.collection('posts').doc(postId).update({
      comentarios: [...comentarios, comentarioAEnviar]
    });

    setNuevoComentario('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comentarios</Text>
      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.createdAt.toString()}
        renderItem={({ item }) => (
          <View style={styles.comentarioBox}>
            <Text style={styles.autor}>{item.email}</Text>
            <Text style={styles.texto}>{item.texto}</Text>
          </View>
        )}
      />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un comentario..."
          value={nuevoComentario}
          onChangeText={(text) => setNuevoComentario(text)}
        />
        <Pressable style={styles.boton} onPress={() => enviarComentario()}>
          <Text style={styles.textoBoton}>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  comentarioBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10
  },
  autor: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555'
  },
  texto: {
    fontSize: 15,
    marginTop: 2
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '75%'
  },
  boton: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 5,
    width: '20%'
  },
  textoBoton: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Comments;