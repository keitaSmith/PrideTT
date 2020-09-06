import { useQuery,gql } from '@apollo/client';
export default Events_Media_Query = gql`
query MediaEvent($start:DateTime! $end:DateTime!){ 
    events(
    where:{start_time_gt:$start start_time_lt:$end}
      sort: "start_time" 
      ){
      id
      title
      content
      start_time
      galleries{
        id
      }
      videos{
        id
      }   
      category{
        name
      }
      image{
        url
      }
    }
  }
`;