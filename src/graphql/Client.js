import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RestLink } from 'apollo-link-rest'
const restLink = new RestLink({
    uri: 'http://newsapi.org/v2/',
    // fetchOptions: {
    //     mode: 'no-cors',
    //   },
    headers: {
      Authorization: '3062ce0fa8084f5d905d69f8c1756c3f'
    }
  })
  export const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache()
  })