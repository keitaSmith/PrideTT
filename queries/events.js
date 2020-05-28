import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PrideTTEvent from '../models/events';
const Events_Query = gql`
    {
        allStrapiEvent {
            edges {
              node {
                id
                title
                content
                image
              }
            }
        }
    }
`;
const AllEvents = props => {
    const { data, error, loading } = useQuery(Events_Query);
    const pridettEvents = [];
        if (error) return "error";
        if (loading) return "loading";
        
        data.allStrapiEvent.edges.forEach(({ node }) =>{
            pridettEvents.push(new PrideTTEvent(node.id,node.title,node.content));
        });
        return pridettEvents;
    }
export default AllEvents;