import { StyleSheet, Text, View } from 'react-native';

function Post(props){
    return(
        <View style={styles.container}>
            <Text>{props.data.descripcionPost}</Text>
            <Text>{props.data.email}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:20
    }
});

export default Post;