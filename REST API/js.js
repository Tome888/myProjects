const url = "http://localhost:5000/api/authentication";

// =====global variables======
const homePage = document.getElementById('switchDivHomePage');
const loginPage = document.getElementById('switchDivLoginPage');
const cardFilterPage = document.getElementById('switchDivCardsFilter');
const chatPage = document.getElementById('switchDivChatPage');
const pageProfile = document.getElementById('switchToProfilePage');
const contactPage = document.getElementById('switchToContactPage');
const wrapperOfBtns = document.querySelector('.wrapperForBurgerBtns')
const burgerBtn = document.getElementById('burgerBtn');

const cardsWrapper = document.getElementById('cardFilterWrapper');
const wrapperAllComm = document.getElementById('commFromTheUSer')

let commentsCardId 

// =====global variables======

// ====Login Func=======
const getValidated = (values) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Response:', data);
    loginSaveToLS();
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    alert('Incorrect Username or Password')
  });
}


const loginSaveToLS = () =>{
    const userNameInput = document.getElementById('username');
    const notyContainer = document.getElementById('logInNoty');
    const closeNoty = document.getElementById('closeNoty');
    const greetMSG = document.querySelector('.greetings');
    const loginForm = document.getElementById('loginForm');
    const formElements = loginForm.childNodes


    const logIn = userNameInput.value;
    localStorage.setItem('userLogIn', logIn);
    greetMSG.innerHTML = `
    <h2>Добредојде!</h2>
          <p>${localStorage.getItem('userLogIn')}</p>
    `;
    
    
    notyContainer.style.display = 'flex'
    closeNoty.addEventListener('click', () =>{
      notyContainer.style.display = 'none'
      
      formElements.forEach(element =>{
        element.disabled = true
      })
    });
    loginForm.reset()
    checkIfLogged()
}


class LoginCreds {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

const login = () => {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('pass');
  const submitBtn = document.getElementById('submitBtn');
  
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const data = new LoginCreds(usernameInput.value, passwordInput.value);

    
    getValidated(data);
    
    
  });
}

const loginBtnNavFunc = () =>{
  const navLoginBtn = document.getElementById('loginBtn');
  

  navLoginBtn.addEventListener('click', ()=>{
    location.hash = 'login'
    checkHash()
  });
}
// ====Login Func=======
// ======cardFilter=====


const addCommentToLS = ()=>{
  const pfp = document.getElementById('pfpOfCommenter');
  const nameOfComm = document.getElementById('usernameOfCommenter');
  const formComment = document.getElementById('commentForm');
  
  class Comment{
    constructor(nameOFUSer, comm, cardId){
      this.nameOFUSer = nameOFUSer;
      this.comm = comm;
      this.cardId = cardId;
    }
  }
  const userNameOFComm = localStorage.getItem('userLogIn')

  nameOfComm.innerHTML = userNameOFComm
  pfp.src = "../Main Project 2/pfp.png"
  
  formComment.addEventListener('submit', (event)=>{
    event.preventDefault();
    const input = document.getElementById('userComment').value.trim();
    
    if(input !== ''){

      const timestamp = new Date().getTime()
      const commentToLs = new Comment(userNameOFComm, input, commentsCardId);
      const toString = JSON.stringify(commentToLs)
      

      localStorage.setItem(`Comment: ${timestamp}`, `${toString}`)
      formComment.reset()
      setCommToPairCard()
    }
  })
  
}


const setCommToPairCard = () =>{
  
  wrapperAllComm.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); 
    if(key.startsWith("Comment: ")){
      const objComm = localStorage.getItem(key)
      const parsedObj = JSON.parse(objComm);
      
      
      if(parsedObj.cardId === commentsCardId){
        
        wrapperAllComm.innerHTML += `
        <div class="addCommentWrapper grayBorderAll">
                   <p>
                    ${parsedObj.comm}
                  </p>
                   <div class="userInfo">
                    <div class="userInfo">
                     <img src="../Main Project 2/pfp.png" />
                      <p>${parsedObj.nameOFUSer}</p>
                     </div>
                     <p class="grayedOutSmall">00/00/00, 00:00</p>
                   </div>
                 </div>
        `
      }
      
    }
  }


}

const checkCommentsAndAdd = () =>{
 
  wrapperAllComm.innerHTML =''
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); 
    if (key.startsWith("Comment: ")) {
      

      const theCommentFromLS = localStorage.getItem(key)
      const parsedComm = JSON.parse(theCommentFromLS);

      
      wrapperAllComm.innerHTML += `
      <div class="addCommentWrapper grayBorderAll">
                <p>
                  ${parsedComm.comm}
                </p>
                <div class="userInfo">
                  <div class="userInfo">
                    <img src="../Main Project 2/pfp.png" />
                    <p>${parsedComm.nameOFUSer}</p>
                  </div>
                  <p class="grayedOutSmall">00/00/00, 00:00</p>
                </div>
              </div>
      `
    }
  }
}

const addBadgeVideo = () =>{
  

  const videoToClick = document.querySelector('.playBtnCards');
  const loggedUser = localStorage.getItem('userLogIn');
  videoToClick.addEventListener('click', ()=>{

    const currentTimestamp = new Date().getTime();
    
    localStorage.setItem(`Badge2: ${loggedUser} ${currentTimestamp}`, '1')

  })
}

const checkForBadgeVideo = ()=>{
  let arrForBadge = []
  const userName = localStorage.getItem('userLogIn');

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if(key.startsWith(`Badge2: ${userName}`)){
      const storeTheViews = localStorage.getItem(key);

      arrForBadge.push(storeTheViews);
      
    }
    
  }
  if(arrForBadge.length >= 5){
    const badgeFiveVIdeos = document.getElementById('watchedVideosBadge');
    badgeFiveVIdeos.style.display = 'flex'
  }
  
}

const funcToCards = () =>{
  const cards = document.querySelectorAll('.card');
  const popupCard = document.querySelector('.backgroundComments')

  const videoImgInPopup = document.querySelector('.videoSection');

  cards.forEach((el) =>{
    el.addEventListener('click', () =>{
      const elementId = +el.dataset.id
      
      commentsCardId = el.dataset.id
      popupCard.style.display = 'flex';
      
      addBadgeVideo()
      function addTheVideo(){
        const cardWithId2 = card.find(item => item.id === elementId);
        videoImgInPopup.style.backgroundImage = `url('${cardWithId2.imageSrc}')`;
        
      }
      setCommToPairCard()
      addTheVideo()
      playVideo()
     
    })
  })

  popupCard.addEventListener('click', (event) =>{
    if(event.target === popupCard){
      popupCard.style.display = 'none';
    }
    
  })
} 

const checkUserPreset = () =>{
  const user = localStorage.getItem('userLogIn')
  const arrOfBtn = document.querySelectorAll('.filterWrapper >*');
  let conditionSatisfied = false;

  if(user){
    
    addCommentToLS()

    for (let i = 0; i < arrOfBtn.length; i++) {
      
      if(localStorage.getItem(`${user} ${arrOfBtn[i].innerText}`)){
        
        conditionSatisfied = true

        arrOfBtn[i].classList.add('btnToggleColor')
        card.forEach((data) =>{
          if(data.tag === arrOfBtn[i].innerText){
            cardsWrapper.innerHTML += `
                <div class="card" data-tag="${data.tag}" data-id="${data.id}">
                  <img src="${data.imageSrc}" alt="" />
                  <div class="textCard">
                    <h4>${data.title} ${data.id}</h4>
                    <p>${data.description}</p>
                    <p>${data.time}</p>
                  </div>
                </div>`;
          }
        })
      }

      
    }
  }else{
    
    

    arrOfBtn.forEach((btn) =>{
      btn.disabled = true
    })

    card.forEach((data) =>{
              cardsWrapper.innerHTML += `
                <div class="card" data-tag="${data.tag}" data-id="${data.id}">
                  <img src="${data.imageSrc}" alt="" />
                  <div class="textCard">
                    <h4>${data.title} ${data.id}</h4>
                    <p>${data.description}</p>
                    <p>${data.time}</p>
                  </div>
                </div>`;
    })
    cardsWrapper.innerHTML = '' 
  }

  
  if(!conditionSatisfied){
    

    card.forEach((data) =>{
        cardsWrapper.innerHTML += `
            <div class="card" data-tag="${data.tag}" data-id="${data.id}">
              <img src="${data.imageSrc}" alt="" />
              <div class="textCard">
                <h4>${data.title} ${data.id}</h4>
                <p>${data.description}</p>
                <p>${data.time}</p>
              </div>
            </div>`;
    })
  }
  funcToCards()
}

const navigateToCardFilter = () =>{
  const btnNavigate = document.getElementById('cardsSectionMoreBtn')
  const navBarBtnCard = document.getElementById('cardFilterPageNav');

  btnNavigate.addEventListener('click', ()=>{
    location.hash = 'card_filter_page'
    checkHash()
    
  })
  navBarBtnCard.addEventListener('click', ()=> {
    location.hash = 'card_filter_page'
    checkHash()
  });
}

const filterCards = () =>{

  const arrOfBtn = document.querySelectorAll('.filterWrapper >*');
  
  arrOfBtn.forEach((btn) =>{
    btn.addEventListener('click', () =>{
      const user = localStorage.getItem('userLogIn')
      const categoryBtn = btn.innerText
      cardsWrapper.innerHTML =''
      if(btn.classList.contains('btnToggleColor')){
        btn.classList.remove('btnToggleColor');

        localStorage.removeItem(`${user} ${categoryBtn}`)
        
      }else{
        btn.classList.add('btnToggleColor');

        localStorage.setItem(`${user} ${categoryBtn}`, `Show cards for ${categoryBtn}`)
        
      }
      
      checkUserPreset()
    })
  })
}

// ======cardFilter=====
//=======Chat======
function getFormattedDateTime() {
  const now = new Date();

  
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const day = String(now.getDate()).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2); 

  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  
  const formattedDateTime = `${month}/${day}/${year}, ${hours}:${minutes}`;

  return formattedDateTime;
}
const setHashChat = () =>{
  const navToChatBtn = document.getElementById('chatSectionMoreBtn');
  const anchorChatBtn = document.getElementById('chatPageNav');

  navToChatBtn.addEventListener('click', () =>{
    location.hash = 'chat'
    checkHash()
    
  })

  anchorChatBtn.addEventListener('click', () =>{
    location.hash = 'chat'
    checkHash()
    
  })
  
}

const loggedInUserToLS = () =>{
  const formChat = document.getElementById('formChat');
  const inputChat = document.getElementById('chatTextInput')
  
  class Chat{
    constructor(username, date, chatLog){
      this.username = username;
      this.date = date;
      this.chatLog = chatLog;
  }
  }

  formChat.addEventListener('submit', (event) =>{
    event.preventDefault()

    const theChat = inputChat.value.trim()
    if(theChat !== ''){
      
      const user = localStorage.getItem('userLogIn');
      const theDate = getFormattedDateTime()
      
      const currentTimestampAlt = new Date().getTime();
      const chatToLs = new Chat(user, theDate, theChat)
      const toStringLS = JSON.stringify(chatToLs)
      localStorage.setItem(`Chat: ${currentTimestampAlt}`, toStringLS)

      localStorage.setItem(`Badge1: ${user}`, 'Badge Granted: Активност во дискусија')

      showChatLogs()
    }
    else{
      return
    }
    inputChat.value = ''
  });
  
}

const showChatLogs = () =>{
  
  const userChatsWrapper = document.getElementById('addUserChat');

  userChatsWrapper.innerHTML = ''

  for (let i = 0; i < localStorage.length; i++) {

   const key = localStorage.key(i)
   
   if(key.startsWith("Chat: ")){

    const objChat = localStorage.getItem(key)
    const parsedObj = JSON.parse(objChat);
    
    userChatsWrapper.innerHTML += `
    <div class="wrapperOfTheComment">
          <p>
          ${parsedObj.chatLog}
          </p>
          <div class="spaceBetween">
            <div class="detailChatDiv">
              <img src="../Main Project 2/pfp.png" alt="" />
              <p>${parsedObj.username}</p>
            </div>
            <p>${parsedObj.date}</p>
          </div>
          <input type="text" placeholder="Пиши коментар..." />
          <div class="detailChatDiv">
          <i class="fa-solid fa-plus"></i>
            <p>5 Коментари</p>
            <p>84 Реакции</p>
          </div>
        </div>

    ` 

   }
 
    
  }

  addClrToChat()
}

const addClrToChat = () =>{
  const allTheChatLogs = document.querySelectorAll('.wrapperOfTheComment');
  const colors = ['#4B7CF366', '#8F39EC66', '#83EAB166', '#764FF066'];

    for (let i = 0; i < allTheChatLogs.length; i++) {

        const colorIndex = i % colors.length;
        allTheChatLogs[i].style.backgroundColor = colors[colorIndex];
      }
  
}

const chatToLS = () =>{
  if(localStorage.getItem('userLogIn')){
    
    const pfp = document.getElementById('pfpChat');
    const changeUsername = document.getElementById('userNameChat');
    changeUsername.innerHTML = `${localStorage.getItem('userLogIn')}`;
    pfp.src = '../Main Project 2/pfp.png';

    loggedInUserToLS()
  }
  
}
//======Chat=======
// =======Profile Page=====

const checkChangesToInfo = () =>{
  const userName = localStorage.getItem('userLogIn')
  const emailInput = document.getElementById('emailInput')
  const birthInput = document.getElementById('birthInput');

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if(key.startsWith('BirthYear: ')){
      const parsedObj = JSON.parse(localStorage.getItem(key));
      
      if(parsedObj.user === userName){
        
        birthInput.value = parsedObj.info
      }
    }
    else if(key.startsWith('Email: ')){
      
      const parsedObj = JSON.parse(localStorage.getItem(key));
      
      if(parsedObj.user === userName){
        
        emailInput.value = parsedObj.info
      }
    }
    
  }
  
}
const funcForEmailChange = (input, newObj) =>{
  const theValue = input.value.trim();
      const username = localStorage.getItem('userLogIn');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailPattern.test(theValue)) {
        const addToLS = new newObj(username, theValue);
        const objToStr = JSON.stringify(addToLS);

        localStorage.setItem(`Email: ${username}`, objToStr);

        checkChangesToInfo();
      } else {
        alert('Enter a valid email address');
      }
}

const funcForBirthChange = (input, newObj) =>{
  const theValue = +input.value.trim();
      const currentYear = new Date().getFullYear();
      const username = localStorage.getItem('userLogIn');

      
      if(theValue<=currentYear){

        const addToLS = new newObj(username, theValue)
        const objToStr = JSON.stringify(addToLS);

        localStorage.setItem(`BirthYear: ${username}`, objToStr);

        checkChangesToInfo()
      }
      else{
        alert('Enter Valid Year');
      }
}

const fillOutFormInputs = () =>{
  const emailInput = document.getElementById('emailInput')
  const birthInput = document.getElementById('birthInput');

  const btnsForInputs = document.querySelectorAll('.changeProfileBtn');

  checkChangesToInfo()

  class UpdateInfo{
    constructor(user, info){
      this.user = user;
      this.info = info;
    }
  }
  birthInput.addEventListener('focus', ()=>{
    
    btnsForInputs[1].style.display = 'flex'
    birthInput.style.backgroundColor = 'white'
    birthInput.style.color = 'black'
  })
  birthInput.addEventListener('blur', ()=>{
    
    setTimeout(() => {
      btnsForInputs[1].style.display = 'none'
      birthInput.style.backgroundColor = ''
      birthInput.style.color = ''
    }, 200);
  })
  btnsForInputs[1].addEventListener('click', (event) =>{
    
    event.preventDefault()
    funcForBirthChange(birthInput, UpdateInfo)
  })
  birthInput.addEventListener('keydown', (event)=>{
    if (event.key === 'Enter') {

      console.log('Enter key was pressed');
      funcForBirthChange(birthInput, UpdateInfo)
      btnsForInputs[1].style.display = 'none'

    }
  })
    

  emailInput.addEventListener('focus', ()=>{
   
   btnsForInputs[0].style.display = 'flex'
   emailInput.style.backgroundColor = 'white'
   emailInput.style.color = 'black'
  })
  emailInput.addEventListener('blur', ()=>{
    
    setTimeout(() => {
      btnsForInputs[0].style.display = 'none'
      emailInput.style.backgroundColor = ''
      emailInput.style.color = ''
    }, 200);
    
   })
  
  btnsForInputs[0].addEventListener('click', (event) =>{
    //for email
    event.preventDefault()
    funcForEmailChange(emailInput, UpdateInfo)
    btnsForInputs[0].style.display = 'none'
  });

  emailInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      funcForEmailChange(emailInput, UpdateInfo)
      btnsForInputs[0].style.display = 'none'

    }
  });
  
}

const navigateToProfilePage = () =>{
  const cardBtn = document.getElementById('profileSectionMoreBtn');
  const anchorNavToProfile = document.getElementById('navToProfilePageAnchor');
  

  cardBtn.addEventListener('click', () =>{
    location.hash = 'profile';
    checkHash()
    
  })
  anchorNavToProfile.addEventListener('click', () =>{
    location.hash = 'profile';
    checkHash()
    
  })

}

const logOutFunc = () =>{
  const logOutBtn = document.querySelector('.logOutBtn');

  logOutBtn.addEventListener('click', () =>{
    localStorage.removeItem('userLogIn');
    location.hash = ''
    location.reload()
    
  })
}

const disableBtn = () =>{
  const disableBtnPage = document.getElementById('profileSectionMoreBtn')
  disableBtnPage.disabled = true
}

const loadBadges = () =>{
  const userName = localStorage.getItem('userLogIn');
  const badgeChat = document.getElementById('chatedBadge');

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if(key.startsWith(`Badge1: ${userName}`)){
      badgeChat.style.display = 'flex'
    }
    
  }
}
// =======Profile Page=====
//======Video Play=====
const playVideo = () =>{
  const theVideo = document.getElementById('videoOnClick');
  const homePageVideoBtn = document.getElementById('homePageVideoPlayBtn')
  const cardPlayBtn = document.querySelector('.playBtnCards');

  theVideo.addEventListener('click', () =>{
    theVideo.style.display = 'none'
  })

  homePageVideoBtn.addEventListener('click', () =>{
    theVideo.style.display = 'flex'
  });
  cardPlayBtn.addEventListener('click', () =>{
    theVideo.style.display = 'flex'
  });
}
//=====VIdeo Play====
//=========Contact Page=======
const contactPageNavigate = () =>{
  const navContactBtn = document.getElementById('contactPageNav');

  navContactBtn.addEventListener('click', () =>{
    location.hash = 'contact'
    checkHash()
  });
}
//=========Contact Page=======
//=====BurgerBtn====
const burgerBtnFunc = () =>{
  burgerBtn.addEventListener('click', () =>{
    
    wrapperOfBtns.classList.toggle('assignToBurgerWrapper');

    burgerBtn.classList.toggle("active");
  })
}
//=======burgerBtn=====


//=======Check if Logged in====
const checkIfLogged = () =>{
  const userName = localStorage.getItem('userLogIn')
  const arrUserOnEl = document.querySelectorAll('.userOn')
  const arrUserOffEl = document.querySelectorAll('.userOff')

  if(userName === null){
    arrUserOnEl.forEach(el =>{
      el.style.display = 'none'
    })
    arrUserOffEl.forEach(el =>{
      el.style.display = 'flex'
    })
    disableBtn()
    
  }else{
    arrUserOnEl.forEach(el =>{
      el.style.display = 'flex'
    })
    arrUserOffEl.forEach(el =>{
      el.style.display = 'none'
    })
  }
} 
//=======Check if Logged in====
// ======Checking Hash=====
const checkHash = () =>{
  if(location.hash === '#login'){
    loginPage.style.display = 'flex'

    homePage.style.display = 'none'
    cardFilterPage.style.display = 'none'
    chatPage.style.display = 'none'
    pageProfile.style.display = 'none';
    contactPage.style.display = 'none';
    
    wrapperOfBtns.classList.remove('assignToBurgerWrapper');
    burgerBtn.classList.remove("active");
  }
  else if(location.hash === ''){
    
    loginPage.style.display = 'none'
    cardFilterPage.style.display = 'none'
    chatPage.style.display = 'none'
    pageProfile.style.display = 'none';
    contactPage.style.display = 'none';
    playVideo()
    wrapperOfBtns.classList.remove('assignToBurgerWrapper');
    burgerBtn.classList.remove("active");
  }
  else if(location.hash === '#card_filter_page'){
    cardFilterPage.style.display = 'flex'
    checkUserPreset()
   

    loginPage.style.display = 'none'
    homePage.style.display = 'none'
    chatPage.style.display = 'none'
    pageProfile.style.display = 'none';
    contactPage.style.display = 'none';
    
    wrapperOfBtns.classList.remove('assignToBurgerWrapper');
    burgerBtn.classList.remove("active");
  }
  else if(location.hash === '#chat'){
    chatPage.style.display = 'flex'
    chatToLS()
    showChatLogs()


    loginPage.style.display = 'none'
    homePage.style.display = 'none'
    cardFilterPage.style.display = 'none'
    pageProfile.style.display = 'none';
    contactPage.style.display = 'none';
    
    wrapperOfBtns.classList.remove('assignToBurgerWrapper');
    burgerBtn.classList.remove("active");
  }
  else if(location.hash === '#profile'){
    pageProfile.style.display = 'flex';
    fillOutFormInputs()
    loadBadges()
    checkForBadgeVideo()

    loginPage.style.display = 'none'
    homePage.style.display = 'none'
    cardFilterPage.style.display = 'none'
    chatPage.style.display = 'none'
    contactPage.style.display = 'none';
    
    wrapperOfBtns.classList.remove('assignToBurgerWrapper');
    burgerBtn.classList.remove("active");
  }
  else if(location.hash === '#contact'){
    contactPage.style.display = 'flex';

    loginPage.style.display = 'none'
    homePage.style.display = 'none'
    cardFilterPage.style.display = 'none'
    chatPage.style.display = 'none'
    pageProfile.style.display = 'none';
    wrapperOfBtns.classList.remove('assignToBurgerWrapper');
    burgerBtn.classList.remove("active");
  }
  
  
}
// ======Checking Hash=====
// =======On Func Upon Page Load=======
burgerBtnFunc()
contactPageNavigate()
logOutFunc()
navigateToProfilePage()
setHashChat()
filterCards()
navigateToCardFilter()
loginBtnNavFunc()
login()
checkIfLogged()
checkHash()