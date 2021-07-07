
import { gql } from '@apollo/client';

export default All_Events_Query = gql`
query Event($today:DateTime!){
    events(
      where:{start_time_gte:$today}
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