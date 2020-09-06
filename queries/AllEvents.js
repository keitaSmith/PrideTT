
import { gql } from '@apollo/client';

//query Event($today:DateTime!){
//where:{start_time_gte:$today}
export default All_Events_Query = gql`
query Event{
    events(
      sort: "start_time" 
      ){
      id
      title
      start_time
      end_time
      content
      location
      favorite @client
      category{
        name
      }
      image{
        url
      }
      form
    }
  }
`;
export const ADD_OR_REMOVE_EVENT_FROM_FAVORITE = gql`
mutation AddOrRemoveEventFromFavorite($eventId:ID!){
  addOrRemoveEventFromFavorite(eventId:$eventId) @client
}
`;
export const FAVORTIE_EVENT_FRAGMENT = gql`
fragment FavoriteEventFragment on Event{
  favorite
}
`;