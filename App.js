import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigator from './navigation/NavigationContainer';
import { FAVORTIE_EVENT_FRAGMENT } from './queries/AllEvents';
const cache = new InMemoryCache({
  typePolicies: {
    Event: {
      fields: {
        favorite: {
          read(favorite = false) {
            return favorite
          }
        }
      }
    }
  }
});

export default function App() {
  const [client, setClient] = useState(null)
  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
      trigger: 'background'
    }).then(() => {
      setClient(new ApolloClient({
        uri: 'http://186.96.211.174:1337/graphql',
        cache,
        resolvers: {
          Mutation: {
            addOrRemoveEventFromFavorite(__, args, { client, cache }) {
              const eventId = cache.identify({
                __typename: 'Event',
                id: args.eventId,
              })
              const { favorite } = client.readFragment({
                fragment: FAVORTIE_EVENT_FRAGMENT,
                id: eventId
              })
              client.writeFragment({
                fragment: FAVORTIE_EVENT_FRAGMENT,
                id: eventId,
                data: {
                  favorite: !favorite,
                }
              })
            }
          }
        }
      })
      )
    })
  }, [])
  if (!client) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fa2f88" />
      </View>
    );
  }
  return (

    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  )

};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});
