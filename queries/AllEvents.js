import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PrideTTEvent from '../models/event';
import moment from 'moment';
const All_Events_Query = gql`
{
    events{
      id
      title
      start_time
      end_time
      content
      image{
        url
      }
    }
  }
`;

const AllEvents = props => {
    const { data, error, loading } = useQuery(All_Events_Query);
    const pridettEvents = [];
        if (error) return "error";
        if (loading) return "loading";

        data.events.forEach(event =>{
          let end;
          let new_date
          if (pridettEvents.length===0){
            new_date = true;
          }else if (pridettEvents[pridettEvents.length-1].readableDate !== moment(event.start_time).format('MMMM Do YYYY')){
            new_date = true;
          }else{ 
          new_date = false;
          }
          if(event.end_time){
            end=new Date(event.end_time)
          }else{
            end = new Date(event.start_time);
            end.setHours( end.getHours() + 1 );
          }
          const now = new Date();
          if(end>now){
            pridettEvents.push(new PrideTTEvent(event.id,event.title,event.content,event.image.url,event.start_time,end,new_date));
          }
        });
        return pridettEvents;
    }
export default AllEvents;