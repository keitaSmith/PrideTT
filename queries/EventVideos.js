import { gql } from '@apollo/client';
export default Event_Videos_Query = gql`
query Event_Videos($id:ID){
    events(where:{id:$id}){
      videos{
        id
        title
        videoId
      }
    }
  }
`;