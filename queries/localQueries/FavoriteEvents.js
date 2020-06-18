import gql from 'graphql-tag';

export default Favorite_Events_Query = gql`
query favorite_events{
        events @client
  }
`;