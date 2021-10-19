import gsap from "gsap/all";
import "../scss/main.scss";
import _, { forEach } from "lodash";

(function () {

  const lightOnSound = new Audio("./audios/light-on.mp3");
  const lightOffSound = new Audio("./audios/light-off.mp3");
  const selector = (selector) => document.querySelector(selector);
  const selectorAll = (selector) => document.querySelectorAll(selector);
  const beefEl = selector(".beef");
  const clickIconEl = selector(".click-icon");
  const keyEl = selector(".key");
  const lightEls = selectorAll(".light");
  const lightToggleEl = selector(".toggle-light");
  const bodyEl = selector("body");
  const switchImgEl = selector(".toggle-light img");
  
  // fix switch disappears
  window.addEventListener("resize", () => {
    lightToggleEl.style.top = "-15vh";
    lightToggleEl.style.right = "10vw";
    switchImgEl.style.height = "40vh";
  });

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

  // keyboard type event
  (function () {

    let keyboardPressed = "";

    window.addEventListener("keydown", k => {

      if (k.key.length === 1) {
        keyboardPressed += (k.key);
      };

      if (/rarebeef|ㄱㅁㄱㄷㅠㄷㄷㄹ/i.test(keyboardPressed)) {
        window.location.reload()
        // lightToggleEl.click();
        // keyboardPressed = ""; // reset keyboard input
      };

    });

  }());

  // switch click event
  (function () {

    let lightActive = false;

    lightToggleEl.addEventListener("click", _.throttle(() => {

      lightActive = !lightActive;

      if(lightActive) {

        // switch sound & animaition
        lightOnSound.play();

        gsap.to(lightToggleEl, .25, {
          top: "-5vh",
          repeat: 1,
          yoyo: true
        });

        // seauential light on
        lightEls.forEach((el, i) => {
          gsap.to(el, 0.2, {
            repeat: 4-i*2,
            yoyo: true,
            delay: i*.55,
            color: "white",
            "text-shadow": "#ff3557 0 0 21px, #ff3557 0 0 42px, #ff3557 0 0 82px, #ff3557 0 0 102px ",
          });
        });

        // body .bright add
        bodyEl.classList.add("bright");

      } else if (!lightActive) {

        // switch sound & animation
        lightOffSound.play(); lightOnSound.load();

        gsap.to(lightToggleEl, .25, {
          top: "-5vh",
          repeat: 1,
          yoyo: true
        });

        // sequential light off
        lightEls.forEach((el, i) => {
          gsap.to(el, 0, {
            delay: i*.3,
            color: "#221718",
            "text-shadow": "none"
          });
        });
        

        // beef light off & deactive
        beefEl.classList.remove("active");
        bodyEl.classList.remove("bright");
      };

    }, 2000)); // event listner & throttle endpoint

  }());

}());