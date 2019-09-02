import drawCard from '../handlers/draw-card';
import setMaxBet from '../handlers/set-max-bet';
import setMinBet from '../handlers/set-min-bet';
// import setPlayerName from '../handlers/set-player-name';

export default function addEventListeners() {
  document.getElementById('draw_card').addEventListener('click', drawCard);
  document.getElementById('set_min_bet').addEventListener('click', setMinBet);
  document.getElementById('set_max_bet').addEventListener('click', setMaxBet);
  // document.getElementById('set_player_name').addEventListener('click', setPlayerName);
}