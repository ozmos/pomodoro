//todo
function countdown(num) {
    let stopTime = new Date;
      stopTime = stopTime.getTime() + (num * 60 * 1000);
    console.log(stopTime);
    let minutes, seconds;
    
    setInterval(calculate, 1000);
    function calculate() {
      console.log('started');
      let startTime = new Date;
      startTime = startTime.getTime();
      let duration = parseInt((stopTime - startTime) / 1000);
      
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        duration = (duration % 60);
        seconds = parseInt(duration);
        document.getElementById('minutes').innerHTML = ('0' + minutes).slice(-2);
        document.getElementById('seconds').innerHTML = ('0' + seconds).slice(-2);
      } 
    } 
    
  }
  