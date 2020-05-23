import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native'
import { client } from './src/graphql/Client'
import { Headlines } from './src/graphql/Queries'
import Article from './src/components/Article'




const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>News App</Text>
  </View>
);

export default function App() {
  
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])
  const requestHeadlines = () => {
    client
      .query({
        query: Headlines
      })
      .then(response => {
        console.log('RESPONSE ==>', response)
        setLoading(response.loading)
        setArticles(response.data.headlines.articles)
      })
      .catch(error => {
        console.log('ERROR ==>', error)
      })
  }
  useEffect(() => {
    requestHeadlines()
  }, [])
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <FlatList
          data={articles}
          renderItem={({ item }) => <Article {...item} />}
          keyExtractor={item => `${item.url}`}
        />
      </View>
    </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  headerText: {
    marginBottom: 5,
    fontSize: 30,
    fontWeight: 'bold'
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  }
});
