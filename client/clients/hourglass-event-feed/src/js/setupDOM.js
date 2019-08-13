import getEventsAndDisplayMarkup from './helpers/getEventsAndDisplayMarkup';

export default async function setupDOM() {
  await getEventsAndDisplayMarkup();
  addListeners();
}

function addListeners() {
  document.getElementById('load-more-transactions').addEventListener('click', getEventsAndDisplayMarkup);
}