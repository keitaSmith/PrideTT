import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import DonationInfo from '../models/donation';

export const Donation_Query = gql`
{
    block {
        donate_link
        hero_heading
        hero_description
    }
}
`;

const Donation = props => {
    const { data, error, loading } = useQuery(Donation_Query);
    
    if (error) return "error";
    if (loading) return "loading";

    const donationInfo =new DonationInfo(data.block.donate_link, data.block.hero_heading, data.block.hero_description);     
    return donationInfo;

}
export default Donation;