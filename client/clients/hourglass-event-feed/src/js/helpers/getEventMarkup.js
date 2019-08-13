import getCardMarkup from './getCardMarkup';

export default function getEventMarkup(events) {
  return events.reduce((accumulator, event, index, events) => {
    return accumulator + getCardMarkup(event, index, events)
  }, '');
}