# **The rare beef**
얼마 전에 제작한 로고를 처음으로 활용해볼 겸 간단한 웹사이트를 하나 제작해보았다.  

간단하고 재밌는 상호작용을 통해 내 git 페이지로 이동할 수 있는 웹사이트를 목표로 만들었다.

웹사이트에 등장하는 모든 이미지(소고기, 그림자, 열쇠, 스위치)는 모두 일러스트에서 svg로 직접 제작한 이미지이며, 스위치 사운드의 출처는 <a href="http://www.theallsounds.com/2017/12/lamp-switch-sound-effects-all-sounds.html">여기</a>.

HTML, JS, SCSS, npm, Webpack, git, netlify를 사용하였다.

<br/>

## **상호작용 & 기능**
크게 2가지 상호작용 & 기능이 존재한다.

1. 스위치  
    스위치를 클릭할 경우 "rarebeef" 글자들에 네온사인이 들어오고 어두웠던 사이트가 밝아지며 사이트에 전원이 공급되는 느낌을 부여했다.  
    
    네온 효과는 `text-shadow`와 JS의 gsap을 이용하였으며, gsap의 옵션인 `repeat`과 `yoyo`, `delay` 를 통해 네온이 깜빡이며 전원이 공급되는 효과를 연출하였다. 네온 효과를 적용할 텍스트는 span으로 구분하여 클래스를 부여하였다.

    로고는 `filter: brightness();` 를 이용하여 전원 공급 전과 후의 밝기를 조절하였다.

    또한 스위치를 제외한 다른 모든 상호작용 요소에 스타일 `pointer-events: none;` 을 선언해두고 스위치를 클릭한 이후에만 `pointer-events: auto;` 를 선언하여 사이트에 전원이 공급된 후에만 다른 상호작용이 가능하도록 만들었다.

    스위치를 클릭할 시 재생되는 사운드의 출처는 <a href="http://www.theallsounds.com/2017/12/lamp-switch-sound-effects-all-sounds.html">여기</a>이며, 로직 프로를 이용해 편집하여 사용했다.

    스위치는 `display: fixed;` 를 선언하여 뷰포트 우측 상단에 고정하였고, `top`을 음수로 선언하여 위쪽이 잘리게 만들었다.  
    이유는 스위치를 클릭하였을 때 `top` 의 수치를 제어하여 스위치가 잠시 아래로 내려왔다가 다시 올라가도록 해서 줄을 당기는 느낌을 부여하기 위함이다. 줄이 당겨졌다가 다시 올라가는 효과는 gsap의 `yoyo`와 `repeat`를 사용하였다.

    스위치가 상호작용 가능한 요소임을 알리기 위해 마우스를 올렸을 때 스위치가 밝게 빛나도록 `filter: brightness(2);` 를 선언하였다.

    마지막으로 스위치에 lodash의 `_.throttle`을 2초 간격으로 적용하여 스위치 클릭을 남발하여 예상치 못한 과부화와 버그를 방지하였다.

2. 로고 플로팅  
    로고를 클릭했을 때 로고가 위로 떠오르며 그 아래 숨겨져있던 열쇠가 모습을 드러내도록 하였다. 이 열쇠에는 git 페이지 링크를 연결하였다.  

    클릭했을 때 로고가 떠오른다는 느낌을 강조하기 위해 고기와 그림자의 이미지를 분리하여 제작했다. 고기 이미지가 위쪽으로 이동할 때 그림자는 반대방향으로 이동하여 고기가 공중으로 떠오르는 느낌을 주고 그로 인해 그림자가 작아지는 모습을 표현하였다.

    열쇠는 상호작용 가능한 요소임을 알리기 위해 마우스를 올리면 밝게 빛나도록 했다. `filter: brightness` 를 사용하였다.

    또한 로고가 떠오를 때 열쇠가 튀어나오는 느낌을 주기 위해 `transform`의 `transitionY()`와 `rotate()` 를 사용하였다.

    뷰포트 크기가 변함에 따라 로고의 크기와 위치도 변하면서 열쇠의 위치가 어긋나는 문제가 발생했다. 이 문제는 미디어쿼리로 뷰포트의 크기에 맞춰 열쇠의 위치를 조절하여 해결했다.

<br/>

## **그 외**

h1과 h2태그 내부에서 span 태그로 다시 한 번 텍스트를 구분하였는데, 이는 뷰포트의 크기에 따라 텍스트가 줄바꿈 될 영역을 지정하고 네온 효과를 적용할 부분을 구분하기 위함이다.



저작권 문구를 빼면 아무것도 없는 푸터에도 이스터에그를 하나 넣고 싶어서 적당한 아이콘을 삽입했는데, 한 번 이상 열쇠를 클릭한 후 이 아이콘을 10번 클릭하면 열쇠의 링크가 내 velog로 변경되도록 하였다.

크기 단위로 vh와 vw만 사용하면 다양한 뷰포트 크기에서 여러 요소의 크기를 일정 비율로 유지할 수 있을 것 같아서 px 대신 vh와 vw만 사용해보았다.

"keydown" 이벤트와 정규표현식을 이용하여 특정 키워드 입력 시 지정한 상호작용 혹은 기능이 실행되도록 하였다. 다만 문제점은, 추가할만한 재밌는 기능이 떠오르지 않아서 현재는 간단하게 "rarebeef" 를 입력하면 새로고침이 되는 정도만 구현해놓았다. 따로 입력창은 없으며 그냥 웹사이트 상에서 키보드로 입력하면 작동된다.

사용한 색상은 아래와 같다.  

- 배경 색상(불 켜지기 전)  
  #2b2b2b

- 배경 색상(불 켜진 후)  
  #ce979e

- 네온 색상  
  #ff3557

- 텍스트 색상  
  #221718
