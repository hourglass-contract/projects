export default function displayCountdown() {  
  const jackpotClock = parseInt(window.dapp.contracts.proofOfSnek.state['3'], 10);

  if (!jackpotClock) {
    return '00h 00m 00s';
  }

  const timeRemaining = getTimeRemaining(jackpotClock);
  if (timeRemaining < 0) {
    return '00h 00m 00s';
  }

  const endTime = jackpotClock * 1000;
  initCountdown(endTime);
}

function getTimeRemaining(jackpotClock) {
  if (!jackpotClock) {

  }

  const now = new Date().getTime();
  const endTime = jackpotClock * 1000;
  const timeRemaining = endTime - now;

  return timeRemaining;
}

function initCountdown(endTime) {
    // Update the count down every 1 second
    let timer = setInterval(incrementTime, 1000);

    function incrementTime() {
      // Get todays date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = endTime - now;
      if (distance < 0) {
        distance = 0;
      }

      // Time calculations for days, hours, minutes and seconds
      // const days = ('0' + Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2);
      const hours = ('0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
      const minutes = ('0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
      const seconds = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);

      // Display the result in the element with id="countdown"
      document.getElementById('countdown').innerHTML = hours + 'h '
      + minutes + 'm ' + seconds + 's ';

      // If the count down is finished, write some text
      if (distance <= 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = '00h 00m 00s';
      }
    }
  }