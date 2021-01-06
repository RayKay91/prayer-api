
console.warn('@@@@@@@@@@@@@@@@@@\n\nWell well well, look who\'s prodding around down here then.\n\n@@@@@@@@@@@@@@@@@@'
);

console.log('How it\'s made:\nA simple scraping app was made using Node JS to scrape the times from the wise-web.org website homepage. They are converted into a much more palatable 24 hour format before being exposed as an API on /getPrayerTimes. These are fetched from the client side and injected into the table. Notifications are based on whether the current time matches the prayer time and they can be silenced, or turned off completely.\n\n The API endpoint is also used for the iOS and Android apps which are built using React Native and Expo (some frameworks to allow javascript code to run on the mobile devices) and they also fetch the last 5 tweets from the twitter account and link to @wisemasjid, and the apps include a link for donations.\n\n There are also desktop versions of the web app for Mac, Windows and Linux made using the Electron framework which is also used to build apps like Slack, Microsoft Teams, and Discord.')


//Selectors
//initial date capture
//DOM Elements
const dateH3 = document.querySelector("h3");
const clock = document.querySelector("#clock");
//selecting rows for class and appearance change
const rowFajr = document.querySelector("tr:nth-of-type(2)");
const rowSunrise = document.querySelector("tr:nth-of-type(3)");
const rowDhuhr = document.querySelector("tr:nth-of-type(4)");
const rowAsr = document.querySelector("tr:nth-of-type(5)");
const rowMaghrib = document.querySelector("tr:nth-of-type(6)");
const rowIsha = document.querySelector("tr:nth-of-type(7)");
//selecting times from first column of timetable
const fajr = document.querySelector(".fajr");
const sunrise = document.querySelector(".sunrise");
const dhuhr = document.querySelector(".dhuhr");
const asr = document.querySelector(".asr");
const maghrib = document.querySelector(".maghrib");
const isha = document.querySelector(".isha");
//selecting times from second column of timetable
const fJam = document.querySelector(".F-Jam");
const dJam = document.querySelector(".D-Jam");
const aJam = document.querySelector(".A-Jam");
const mJam = document.querySelector(".M-Jam");
const iJam = document.querySelector(".I-Jam");
//selecting button

// buttons under table
const nEnabled = document.querySelector(".nEnabled");
const nSilenced = document.querySelector(".nSilenced");
const nOff = document.querySelector(".nOff");


fetch('/getPrayerTimes').then(res=> res.json()).then(times =>{


  
  const {fajr, sunrise, dhuhr, asr, maghrib, isha} = times.prayerTimes

  const {fajrJamaa, dhuhrJamaa, asrJamaa, maghribJamaa, ishaJamaa} = times.jamaaTimes 


  setPrayerTimes(
    fajr,
    sunrise,
    dhuhr,
    asr,
    maghrib,
    isha,
    fajrJamaa,
    dhuhrJamaa,
    asrJamaa,
    maghribJamaa,
    ishaJamaa
  );

 

  timeDifference(fajr, sunrise, dhuhr, asr, maghrib, isha);
  function run() {
    currentTime();
    const shouldUpdateTimes = currentTime();

    shouldUpdateTimes
      ? setPrayerTimes(
          fajr,
          sunrise,
          dhuhr,
          asr,
          maghrib,
          isha,
          fajrJamaa,
          dhuhrJamaa,
          asrJamaa,
          maghribJamaa,
          ishaJamaa
        )
      : "";

    timeDifference(fajr, sunrise, dhuhr, asr, maghrib, isha);
    setTimeout(function () {
      run();
    }, 1000); /* setting timer*/
  }
  run();
}).catch(err => console.log(err, 'error'));


// Event listeners
nEnabled.addEventListener("mousedown", permitNotifications);
nSilenced.addEventListener("mousedown", silenceNotifications);
nOff.addEventListener("mousedown", stopNotifications);

//Functions
const setPrayerTimes = (
  Fajr,
  Sunrise,
  Dhuhr,
  Asr,
  Maghrib,
  Isha,
  FajrJamaa,
  DhuhrJamaa,
  AsrJamaa,
  MaghribJamaa,
  IshaJamaa
) => {
  fajr.innerText = Fajr;
  fJam.innerText = FajrJamaa;
  sunrise.innerText = Sunrise;
  dhuhr.innerText = Dhuhr;
  dJam.innerText = DhuhrJamaa;
  asr.innerText = Asr;
  aJam.innerText = AsrJamaa;
  maghrib.innerText = Maghrib;
  mJam.innerText = MaghribJamaa;
  isha.innerText = Isha;
  iJam.innerText = IshaJamaa;
};
//changes styling of table and notifies of prayer time upon active class assignment
function timeDifference(fTime, sTime, dTime, aTime, mTime, iTime) {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let sec = date.getSeconds();
  h = checkZero(h);
  m = checkZero(m);
  sec = checkZero(sec);
  const nCheckF = fTime + ":00";
  const nCheckD = dTime + ":00";
  const nCheckA = aTime + ":00";
  const nCheckM = mTime + ":00";
  const nCheckI = iTime + ":00";

  const currentTime = parseInt(h + "" + m);

  const accurateCurrentTime = h + ":" + m + ":" + sec;

  const fajrTime = +fTime.replace(":", "");
  const sunrisetime = +sTime.replace(":", "");
  const dhuhrTime = +dTime.replace(":", "");
  const asrTime = +aTime.replace(":", "");
  const maghribTime = +mTime.replace(":", "");
  const ishaTime = +iTime.replace(":", "");

  if (currentTime >= fajrTime && currentTime < sunrisetime) {
    if (accurateCurrentTime === nCheckF) notify("Fajr");
    rowFajr.classList.add("active");
  } else if (currentTime >= sunrisetime && currentTime < dhuhrTime) {
    changeActiveClass(rowFajr, rowSunrise);
  } else if (currentTime >= dhuhrTime && currentTime < asrTime) {
    if (accurateCurrentTime === nCheckD) notify("Dhuhr");
    changeActiveClass(rowSunrise, rowDhuhr);
  } else if (currentTime >= asrTime && currentTime < maghribTime) {
    if (accurateCurrentTime === nCheckA) notify("Asr");
    changeActiveClass(rowDhuhr, rowAsr);
  } else if (currentTime >= maghribTime && currentTime < ishaTime) {
    if (accurateCurrentTime === nCheckM) notify("Maghrib");
    changeActiveClass(rowAsr, rowMaghrib);
  } else if (currentTime >= ishaTime && currentTime <= 2359) {
    if (accurateCurrentTime === nCheckI) notify("Isha");
    changeActiveClass(rowMaghrib, rowIsha);
  } else if (!currentTime) {
    rowIsha.classList.remove("active");
  }
}
function changeActiveClass(rowRemove, rowAdd) {
  rowRemove.classList.remove("active");
  rowAdd.classList.add("active");
}
//gets and sets clock
function currentTime() {
  let date = new Date(); /* creating object of Date class */
  let hour = date.getHours();
  let mi = date.getMinutes();
  let sec = date.getSeconds();
  hour = checkZero(hour);
  mi = checkZero(mi);
  sec = checkZero(sec);
  clock.innerText = hour + ":" + mi + ":" + sec; /* adding time to the div */
  if (hour + ":" + mi + ":" + sec === "00:00:00") {
    setDate();
    return true;
  }
  return false;
}
//adds zero to minute/hour/sec below 10
function checkZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}


function setDate() {
  const date = new Date();
  dateH3.innerText = date.toDateString();
}

function notify(pName) {
  if (Notification.permission === "granted") {
    if (
      nEnabled.classList.contains("pressed") &&
      !nSilenced.classList.contains("pressed")
    ) {
      new Notification(`Time for ${pName} prayer`, {
        body: `The time for ${pName} prayer has started.`,
        soundName: "default",
      });
    } else if (nSilenced.classList.contains("pressed")) {
      new Notification(`Time for ${pName} prayer`, {
        body: `The time for ${pName} prayer has started.`,
        silent: true,
      });
    } else if (nOff.classList.contains("pressed")) {
    }
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }
}

function permitNotifications() {
  nEnabled.classList.toggle("pressed");
  nOff.classList.remove("pressed");
  if (!nEnabled.classList.contains("pressed")) {
    nOff.classList.add("pressed");
    nSilenced.classList.remove("pressed");
  }
}
function stopNotifications() {
  nOff.classList.toggle("pressed");
  nEnabled.classList.remove("pressed");
  nSilenced.classList.remove("pressed");
  if (!nOff.classList.contains("pressed")) {
    nEnabled.classList.add("pressed");
  }
}
function silenceNotifications() {
  nEnabled.classList.add("pressed");
  nSilenced.classList.toggle("pressed");
  nOff.classList.remove("pressed");
  if (!nSilenced.classList.contains("pressed")) {
    nEnabled.classList.add("pressed");
  }
}
function notificationPermission() {
  if (
    Notification.permission !== "granted" &&
    Notification.permission !== "denied"
  ) {
    Notification.requestPermission();
  }
}
notificationPermission();
setDate();
