import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Article = ({ title, source }) => (
  <View style={styles.content}>
    <Text style={styles.source}>{source.name}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  content: {
    marginLeft: 10,
    flex: 1
  },
  source: {
    color: '#3d3c41',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 3
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  }
})

export default Article