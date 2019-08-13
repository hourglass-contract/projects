import getEventType from './getEventType';
import createOnTokenPurchaseCard from './cards/createOnTokenPurchaseCard';
import createOnWithdrawCard from './cards/createOnWithdrawCard';
import createOnTokenSellCard from './cards/createOnTokenSellCard';
import createOnReinvestmentCard from './cards/createOnReinvestmentCard';
import createTransferCard from './cards/createTransferCard';

const cardMap = {
  onTokenPurchase: createOnTokenPurchaseCard,
  onWithdraw: createOnWithdrawCard,
  onTokenSell: createOnTokenSellCard,
  onReinvestment: createOnReinvestmentCard,
  Transfer: createTransferCard,
}

export default function getCardMarkup(event, index, events) {
	const eventType = getEventType(event);

  // squash buy and reinvestment duplicates
  if (eventType === 'onTokenPurchase' && index > 0 && getEventType(events[index - 1]) === 'onReinvestment') {
    return '';
  }

	return cardMap[eventType](event);
}