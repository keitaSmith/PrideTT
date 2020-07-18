import gql from 'graphql-tag';
import {useRef}from'react';
import { useQuery,useMutation } from '@apollo/react-hooks';
import PrideTTEvent from '../models/event';
import moment from 'moment';

export const Recent_Events_Query = gql`
query Event($today:DateTime!){
    events(
      limit:5  
      where:{start_time_gte:$today}
      ){
      id
      title
      start_time
      end_time
      content
      location
      form
      category{
        name
      }
      image{
        url
      }
    }
  }
`;

const RecentEvents = props => {
    const today = useRef(new Date()).current;
    const { data, error, loading } = useQuery(Recent_Events_Query, {
      variables: {today}
    });
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
          let category;
          if (event.category){
            category = event.category.name
          }else{
            category = null
          }
          if(end>now){
            pridettEvents.push(new PrideTTEvent(event.id,event.title,event.content,category,event.location,event.image.url,event.form,event.start_time,end,new_date));
          }
        });
        return pridettEvents;
    }
export default RecentEvents;