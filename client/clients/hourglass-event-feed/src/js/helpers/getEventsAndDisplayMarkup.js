import getEventLogs from './getEventLogs';
import getEventMarkup from './getEventMarkup';
import queryStringToJSON from './queryStringToJSON';

const loadMore = document.getElementById('load-more-transactions');

export default async function getEventsAndDisplayMarkup() {
  loadMore.classList.add('hidden');
  const events = (await getEventLogs()).reverse();
  const markup = getEventMarkup(events) + '<div class="load-more-spacer"></div>';

  document.getElementById('event-feed').insertAdjacentHTML('beforeend', markup);
  
  const { address } = queryStringToJSON();
  if (!address) {
    loadMore.classList.remove('hidden');
  }
}