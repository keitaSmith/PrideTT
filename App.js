import React from 'react'
import {
  StyleSheet,
  Text,
  View,

} from 'react-native'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import AppNavigator from './navigation/NavigationContainer';
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://186.96.211.174:1337/graphql' }),
  cache: new InMemoryCache({})
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
