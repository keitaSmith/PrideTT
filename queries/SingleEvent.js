import gql from 'graphql-tag';

export const Single_Events_Query = gql`
query Event($id: String!){
    events(where:{id: $id}){
      id
      title
      start_time
      end_time
      content
      location
      category{
        name
      }
      image{
        url
      }
    }
  }
`;


