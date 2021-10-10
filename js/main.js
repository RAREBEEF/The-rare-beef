import gsap from "gsap/all";
import "../scss/main.scss";
import _ from "lodash";

(function () {
  setTimeout(() => {
    console.log(`© 2021. RAREBEEF All Rights Reserved.`);
    console.log(`- Click the beef.
    
    - Click the key one or more times, then click the "click icon" somewhere 10 times.
    
    - Click switch
    `);
  }, 3000);
}());

const selector = (selector) => document.querySelector(selector);
const selectorAll = (selector) => document.querySelectorAll(selector);



// 소고기 클릭 이벤트
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






// 열쇠 클릭 이벤트
(function () {  
  const clickIconEl = selector(".click-icon");
  const keyEl = selector(".key");
  let keyClicked = false;

  keyEl.addEventListener("click", () => {
    keyClicked = true;
  });
  // 아이콘 클릭 이벤트
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


// 키보드 입력 이벤트
// TODO: 새로운 이벤트 구상하고 부여하기
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



(function () {

}());


// 스위치 클릭 이벤트
(function () {
  const lightOnSound = new Audio("./audios/light-on.mp3");
  const lightOffSound = new Audio("./audios/light-off.mp3");
  const lightEls = selectorAll(".light");
  const lightToggleEl = selector(".toggle-light");
  const beefEl = selector(".beef");
  let lightOffTimeout = [];
  let lightActive = false;

  lightToggleEl.addEventListener("click", _.throttle(() => {

    lightActive = !lightActive;
    if(lightActive) {
      lightActive = true;
      lightOnSound.play();
      // 시간 종료시 스위치 애니메이션 실행
      lightOffTimeout.push(setTimeout(() => {gsap.to(lightToggleEl, .25, {top: "-5vh", repeat: 1, yoyo: true}); beefEl.classList.add("bright");}, 26000));
      // 순차적 네온 on
      lightEls.forEach((el, i) => {
        lightOffTimeout.push(setTimeout(() => {gsap.to(el, 0, {delay: i*.55, color: "#2b1719", "text-shadow": "none"}); lightActive = false}, 26000)); // 시간 종료 시 네온 off
        gsap.to(el, 0, {
          delay: i*.55,
          color: "white",
          "text-shadow": "0 0 21px rgb(255, 197, 207), 0 0 42px rgb(255, 53, 87), 0 0 82px rgb(255, 53, 87), 0 0 102px rgb(255, 53, 87)"
        });
      });
      // 스위치 애니메이션
      gsap.to(lightToggleEl, .25, {
        top: "-5vh",
        repeat: 1,
        yoyo: true
      });
      beefEl.classList.add("bright");
    } else if (!lightActive) {
      lightActive = false;
      lightOffSound.play();
      lightOnSound.pause();
      lightOnSound.load();
      // 순차적 네온 off(딜레이 때문에 안꺼지는 현상 방지하고자 순차적 off)
      lightEls.forEach((el, i) => {
        clearTimeout(lightOffTimeout[i+1]);
        gsap.to(el, 0, {
          delay: i*.55,
          color: "#2b1719",
          "text-shadow": "none"
        });
      });
      clearTimeout(lightOffTimeout[0]);
      lightOffTimeout = [];
      // 스위치 애니메이션
      gsap.to(lightToggleEl, .25, {
        top: "-5vh",
        repeat: 1,
        yoyo: true
      });
      beefEl.classList.remove("bright");
    };
  }, 2000));
}());
















// (function () {
//   const lightOnSound = new Audio("./audios/light-on.mp3");
//   const lightOffSound = new Audio("./audios/light-off.mp3");
//   const lightEls = selectorAll(".light");
//   const lightToggleEl = selector(".toggle-light")
//   let lightActive = false;
//   let lightOnTimeout = [];
//   let lightOffTimeout = [];
//   lightToggleEl.addEventListener("click", () => {
//     lightActive = !lightActive;
//     if(lightActive) {
//       lightActive = true;
//       lightOnSound.play();
//       lightEls.forEach((el, i) => {
//         lightOnTimeout.push(setTimeout(() => {el.classList.add("light-on")}, 550*i));
//         lightOffTimeout.push(setTimeout(() => {el.classList.remove("light-on"); lightActive = false}, 26000));
//       });
//       gsap.to(lightToggleEl, .5, {
//         top: 0
//       });
//       gsap.to(lightToggleEl, .5, {
//         top: "-10vh",
//         delay: .5
//       });
//     } else if (!lightActive) {
//       lightActive = false;
//       lightOffSound.play();
//       lightOnSound.pause();
//       lightOnSound.load();
//       lightEls.forEach((el, i) => {
//         el.classList.remove("light-on");
//         clearTimeout(lightOnTimeout[i]);
//         clearTimeout(lightOffTimeout[i]);
//       });
//       lightOnTimeout = [];
//       lightOffTimeout = [];
//       gsap.to(lightToggleEl, .5, {
//         top: 0
//       });
//       gsap.to(lightToggleEl, .5, {
//         top: "-10vh",
//         delay: .5
//       });
//     };
//   });
// }());
