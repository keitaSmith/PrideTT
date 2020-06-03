import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PrideTTRecentEvent from '../models/recentEvent';
import moment from 'moment';
const Recent_Events_Query = gql`
{
    allStrapiEvent(limit: 5) {
      edges {
        node {
          id
          title
          start_time
          end_time
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
const RecentEvents = props => {
    const now = new Date();
    now.setHours( now.getHours() - 1 );
    const { data, error, loading } = useQuery(Recent_Events_Query,{variables: now});
    const pridettRecentEvents = [];
        if (error) return "error";
        if (loading) return "loading";

        data.allStrapiEvent.edges.forEach(({ node }) =>{
          let end;
          if(node.end_time){
            end=new Date(node.end_time)
          }else{
            end = new Date(node.start_time);
            end.setHours( end.getHours() + 1 );
          }
          const now = new Date();

          if(end>now){
            pridettRecentEvents.push(new PrideTTRecentEvent(node.id,node.title,node.image.childImageSharp.original.src));
          }
        });
        return pridettRecentEvents;
    }
export default RecentEvents;