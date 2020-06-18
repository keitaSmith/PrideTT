import gql from 'graphql-tag';
import { useQuery,useMutation } from '@apollo/react-hooks';
import PrideTTEvent from '../models/event';
import moment from 'moment';

export const All_Events_Query = gql`
{
    allStrapiEvent{
      edges {
        node {
          id
          title
          start_time
          end_time
          content
          image {
            childImageSharp {
              original {
                src
              }
            }
          }
        }
      }
    }
  }
`;
const AllEvents = props => {
    const { data, error, loading } = useQuery(All_Events_Query);
    const pridettEvents = [];
        if (error) return "error";
        if (loading) return "loading";

        data.allStrapiEvent.edges.forEach(({ node }) =>{
          let end;
          let new_date
          if (pridettEvents.length===0){
            new_date = true;
          }else if (pridettEvents[pridettEvents.length-1].readableDate !== moment(node.start_time).format('MMMM Do YYYY')){
            new_date = true;
          }else{ 
          new_date = false;
          }
          if(node.end_time){
            end=new Date(node.end_time)
          }else{
            end = new Date(node.start_time);
            end.setHours( end.getHours() + 1 );
          }
          const now = new Date();
          if(end>now){
            pridettEvents.push(new PrideTTEvent(node.id,node.title,node.content,node.image.childImageSharp.original.src,node.start_time,end,new_date));
          }
        });
        return pridettEvents;
    }
export default AllEvents;