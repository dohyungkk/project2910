function animate({duration, draw, timing}) {

    let start = performance.now();
    var done = false;
    var stats = document.getElementById("savingStats");
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      let progress = timing(timeFraction)
  
      draw(progress);
      stats.innerHTML = "You saved $" + (timeFraction * 200).toFixed(2);
      if (timeFraction < 0.44) {
        requestAnimationFrame(animate);
      }
    });
        
  }