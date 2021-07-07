import { useQuery,gql } from '@apollo/client';

export const Featured_Images_Query = gql`
{
    galleries(where:{title:"App Featured Images"}){
      images{
        url
      }
    }
  }
`;

import db from '../constants/DBUrl'
const FeaturedImages = () => {
    const { data, error, loading } = useQuery(Featured_Images_Query, {
      fetchPolicy: 'network-only',
    });
    if (error) return "error";
  if (loading) return "loading";
    const featuredImages=[];
    data.galleries.forEach(gallery => {
      gallery.images.forEach(image=>{
        const imageUrl={uri:db.url+image.url};
        featuredImages.push(imageUrl)
      });
    })
    return featuredImages;
}
export default FeaturedImages;