import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PrideTTRecentEvent from '../models/recentEvent';
import moment from 'moment';
const Recent_Events_Query = gql`
{
    events{
      id
      title
      start_time
      end_time
      image{
        url
      }
    }
  }
`;
const RecentEvents = props => {
    const now = new Date();
    now.setHours( now.getHours() - 1 );
    const { data, error, loading } = useQuery(Recent_Events_Query,{variables: now});
    const pridettRecentEvents = [];
        if (error) return "error";
        if (loading) return "loading";
        data.events.forEach(event =>{
          let end;
          if(event.end_time){
            end=new Date(event.end_time)
          }else{
            end = new Date(event.start_time);
            end.setHours( end.getHours() + 1 );
          }
          const now = new Date();

          if(end>now){
            pridettRecentEvents.push(new PrideTTRecentEvent(event.id,event.title,event.image.url));
          }
        });
        return pridettRecentEvents;
    }
export default RecentEvents;