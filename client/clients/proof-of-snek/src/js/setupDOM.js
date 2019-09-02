import hydrate from './display/hydrate';
import addEventListeners from './listeners/add-event-listeners';

export default function setupDOM() {
  hydrate();
  addEventListeners();
}