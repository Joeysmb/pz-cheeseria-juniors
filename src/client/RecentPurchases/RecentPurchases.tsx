import { Wrapper } from './RecentPurchases.styles';
import { CartItemType } from '../App';
import RecentlyPurchasedItem from "./RecentlyPurchasedItem/RecentlyPurchasedItem"

type Props = {
    recentPurchases: CartItemType[],
}

const RecentPurchases: React.FC<Props> = ({recentPurchases}) => {

    return(
        <Wrapper>
      <h2>Most recent purchases</h2>
      {recentPurchases.length === 0 ? <p>No Items to display.</p> : null}
      {recentPurchases.map(item => (
        <RecentlyPurchasedItem
          key={item.id}
          recentlyPurchasedItem={item}
        />
      ))}
    </Wrapper>
    );

};

export default RecentPurchases;