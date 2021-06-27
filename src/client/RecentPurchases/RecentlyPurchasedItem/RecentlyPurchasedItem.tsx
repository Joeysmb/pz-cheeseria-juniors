import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './RecentlyPurchasedItem.style';

type Props = {
  recentlyPurchasedItem: CartItemType;
};

const RecentlyPurchasedItem: React.FC<Props> = ({ recentlyPurchasedItem }) => (
  <Wrapper>
    <div>
      <h3>{recentlyPurchasedItem.title}</h3>
      <div className='information'>
        <p>Price: ${recentlyPurchasedItem.price}</p>
      </div>
    </div>
    <img src={recentlyPurchasedItem.image} alt={recentlyPurchasedItem.title} />
  </Wrapper>
);

export default RecentlyPurchasedItem;