import "../scss/main.scss";
console.log("© 2021. RAREBEEF All Rights Reserved.");
console.log(`
#####      ##     #####    ######   #####    ######   ######   ######  
##  ##    ####    ##  ##   ##       ##  ##   ##       ##       ##      
##  ##   ##  ##   ##  ##   ##       ##  ##   ##       ##       ##      
#####    ######   #####    ####     #####    ####     ####     ####    
####     ##  ##   ####     ##       ##  ##   ##       ##       ##      
## ##    ##  ##   ## ##    ##       ##  ##   ##       ##       ##      
##  ##   ##  ##   ##  ##   ######   #####    ######   ######   ##     

`)

const beefEl = document.querySelector(".beef");
let isActive = false;
beefEl.addEventListener("click", function () {
  if (!isActive) {
    isActive = !isActive;
    beefEl.classList.add("active");
  } else {
    isActive = !isActive;
    beefEl.classList.remove("active");
  };
});