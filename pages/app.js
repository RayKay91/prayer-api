console.warn('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n\nYou\'re a sneaky one aren\'t you, prodding around down here\n\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')


//Selectors
//initial date capture
//DOM Elements
const dateH3 = document.querySelector("#date");
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

  
  //adds zero to minute/hour/sec below 10
function checkZero(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }


  //date function
  function setDate() {
    const date = new Date();
    dateH3.innerText = date.toDateString();
  }
  
  
