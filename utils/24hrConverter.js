function convertTo24Hr(time) {
    //check if hour is 12 or 11 if so do not add 12

  
    if (time.substring(0,2) === "12" || time.substring(0, 2) === "11") return time;

  
    if (time[0] !== "0") {
      time = "0" + time;
    }
    let hours = time.substring(0, 2);

  
    hours = parseInt(hours) + 12;
    return hours + time.substring(2);
    
  }

  module.exports = convertTo24Hr