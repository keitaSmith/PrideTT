import { gql } from '@apollo/client';

export default Featured_Images_Media_Query = gql`
{
    galleries(where:{title:"Media Featured Images"}){
      images{
        id
        name
        url
      }
    }
  }
`;
