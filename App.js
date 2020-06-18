import React from 'react'
import {
  StyleSheet,
  Text,
  View,

} from 'react-native'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import Events from './screens/Events';
import Home from './screens/Home';
import AppNavigator from './navigation/NavigationContainer';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://186.96.211.174:8000/___graphql' }),
  cache: new InMemoryCache(),
  clientState: {
    events:[1,2,3,4,5],
    defaults: {
      //isConnected: true,
      events:[],
    },
    // resolvers: {
    //   Mutation: {
    //     updateNetworkStatus: (_, { isConnected }, { cache }) => {
    //       cache.writeData({ data: { isConnected }});
    //       return null;
    //     }
    //   }
    // }
  }
  
});
const initData=()=>{
  client.writeData({
    data:{
      events:[]
    }
  })
}
initData();
client.onResetStore(async()=>{
  initData();
});
client.onClearStore(async()=>{
  initData();
});


export default function App() {


  return (
    
    <ApolloProvider client={client}>
      <AppNavigator/>
    </ApolloProvider>
  )

};

const styles = StyleSheet.create({
  container: {
    margin:10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});
