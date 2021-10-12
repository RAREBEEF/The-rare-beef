import gsap from "gsap/all";
import "../scss/main.scss";
import _ from "lodash";

const selector = (selector) => document.querySelector(selector);
const selectorAll = (selector) => document.querySelectorAll(selector);

// console log
(function () {
  setTimeout(() => {
    console.log(`© 2021. RAREBEEF All Rights Reserved.`);
    console.log(`
    - Light on.

    - Click the rare beef.
    
    - Click the key one or more times, then click the "click icon" somewhere 10 times.
    
    `);
  }, 3000);
}());

// beef click event
(function () {
  const beefEl = selector(".beef");
  let isBeefActive = false;
  beefEl.addEventListener("click", () => {
    if (!isBeefActive) {
      isBeefActive = !isBeefActive;
      beefEl.classList.add("active");
    } else {
      isBeefActive = !isBeefActive;
      beefEl.classList.remove("active");
    };
  });
}());

// key click event
(function () {  
  const clickIconEl = selector(".click-icon");
  const keyEl = selector(".key");
  let keyClicked = false;

  keyEl.addEventListener("click", () => {
    keyClicked = true;
  });
  // ico click event
  let clickIconCount = 1;
  clickIconEl.addEventListener("click", () => {
    if (clickIconCount == 10) {
      console.log(`
        #####      ##     #####    ######   #####    ######   ######   ######  
        ##  ##    ####    ##  ##   ##       ##  ##   ##       ##       ##      
        ##  ##   ##  ##   ##  ##   ##       ##  ##   ##       ##       ##      
        #####    ######   #####    ####     #####    ####     ####     ####    
        ####     ##  ##   ####     ##       ##  ##   ##       ##       ##      
        ## ##    ##  ##   ## ##    ##       ##  ##   ##       ##       ##      
        ##  ##   ##  ##   ##  ##   ######   #####    ######   ######   ##     

        Click the key again.
      `);
      keyEl.href = "https://velog.io/@drrobot409";
      clickIconCount += 1;
    } else if (keyClicked) {
      console.log(clickIconCount);
      clickIconCount += 1;
    };
  });
}());

// keyboard click event
// TODO: add new event
// (function () {
//   const lightEls = selectorAll(".light");
//   const lightToggleEl = selector(".toggle-light")
//   let keyboardPressed = "";
//   let lightActive = false;

//   if (!lightActive) {
//     window.addEventListener("keydown", k => {

//       keyboardPressed += (k.key);

//       if (/rarebeef|ㄱㅁㄱㄷㅠㄷㄷㄹ/i.test(keyboardPressed)) {
//         lightActive = true;
//         keyboardPressed = "";
//         lightOnSound.play();
//         lightEls.forEach((el, i) => {
//           setTimeout(() => {el.classList.add("light-on")}, 550*i);
//           setTimeout(() => {el.classList.remove("light-on"); lightActive = false}, 26000);
//         })
//       };
//     })
//   };
// }());

// switch click event
(function () {
  const lightOnSound = new Audio("./audios/light-on.mp3");
  const lightOffSound = new Audio("./audios/light-off.mp3");
  const lightEls = selectorAll(".light");
  const lightToggleEl = selector(".toggle-light");
  const beefEl = selector(".beef");
  const bodyEl = selector("body");
  // let lightOffTimeout = [];
  let lightActive = false;

  lightToggleEl.addEventListener("click", _.throttle(() => {

    lightActive = !lightActive;
    if(lightActive) {
      lightActive = true;
      lightOnSound.play();
      // timeout -> switch animation & beef light off & toggle boolean
      // lightOffTimeout.push(setTimeout(() => {gsap.to(lightToggleEl, .25, {top: "-5vh", repeat: 1, yoyo: true}); beefEl.classList.remove("bright"); lightActive = false;}, 26000));
      // sequential light on
      lightEls.forEach((el, i) => {
        // lightOffTimeout.push(setTimeout(() => {gsap.to(el, 0, {delay: i*.55, color: "#221718", "text-shadow": "none"});}, 26000)); // timeout -> light off
        gsap.to(el, 0.2, {
          repeat: 4-i*2,
          yoyo: true,
          delay: i*.55,
          color: "white",
          "text-shadow": "rgb(255, 197, 207) 0 0 21px , rgb(255, 53, 87) 0 0 42px , rgb(255, 53, 87) 0 0 82px , rgb(255, 53, 87) 0 0 102px ",
        });
      });
      // light on switch animation
      gsap.to(lightToggleEl, .25, {
        top: "-5vh",
        repeat: 1,
        yoyo: true
      });
      bodyEl.classList.add("bright");
    } else if (!lightActive) {
      lightActive = false;
      lightOffSound.play(); lightOnSound.load();
      // sequential light off
      lightEls.forEach((el, i) => {
        gsap.to(el, 0, {
          delay: i*.3,
          color: "#221718",
          "text-shadow": "none"
        });
      });
      // shutdown all timeout function
      // for (let i = 0; i < lightOffTimeout.length; i++) {
      //   clearTimeout(lightOffTimeout[i]);
      // };
      // lightOffTimeout = [];
      // light off switch animation
      gsap.to(lightToggleEl, .25, {
        top: "-5vh",
        repeat: 1,
        yoyo: true
      });
      // beef light off & deactive
      beefEl.classList.remove("active");
      bodyEl.classList.remove("bright");
    };
  }, 2000));
}());