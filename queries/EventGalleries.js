import { gql } from '@apollo/client';
export default Event_Galleries_Query = gql`
query Event_Galleries($id:ID){
    events(where:{id:$id}){
      id
      title
      galleries{
        id
        title
        credits
        feature{
          url
        }
        images{
          id
          url
        }
      }
    }
  }
`;