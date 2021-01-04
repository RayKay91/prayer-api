const dayjs = require('dayjs')

function getDate () {

  return dayjs().format('dddd, D MMM, YYYY')

  };

  module.exports = getDate

  console.log(getDate())

