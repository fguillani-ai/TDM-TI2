import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import NewPost from '../../screens/NewPost/NewPost'
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HomeMenu (){
  return(
    <Tab.Navigator screenOptions={{ headerShown:false }}>
      <Tab.Screen 
        name='Home' 
        component={Home} 
        options={{tabBarIcon:()=> <FontAwesome name="home" size={24} color="black"/>}}
      />

      <Tab.Screen 
        name='NewPost' 
        component={NewPost} 
        options={{tabBarIcon:()=> <FontAwesome name="plus" size={24} color="black"/>}}
      />

      <Tab.Screen 
        name='Profile' 
        component={Profile} 
        options={{tabBarIcon:()=> <FontAwesome name="user" size={24} color="black"/>}}
      />
   
    </Tab.Navigator>
  )
}

export default HomeMenu;