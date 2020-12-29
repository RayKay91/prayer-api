const axios = require('axios');
const cheerio = require('cheerio');

const fetchData = async () => {
  const result = await axios.get('https://wise-web.org');
  return cheerio.load(result.data);
};

async function getTimes() {
  const $ = await fetchData();
  const fajr = $('#panel-w5f3cfd55e7b69-0-0-1 > div > p:nth-child(1)').text();
  const fajrJamaa = $(
    '#panel-w5f3cfd55e7b69-0-0-1 > div > p:nth-child(2)'
  ).text();
  const sunrise = $(
    '#panel-w5f3cfd55eaad0-0-0-1 > div > p:nth-child(1)'
  ).text();
  const dhuhr = $('#panel-w5f3cfd55eacb0-0-0-1 > div > p:nth-child(1)').text();
  const dhuhrJamaa = $(
    '#panel-w5f3cfd55eacb0-0-0-1 > div > p:nth-child(2)'
  ).text();
  const asr = $('#panel-w5f3cfd55eae21-0-0-1 > div > p:nth-child(1)').text();
  const asrJamaa = $(
    '#panel-w5f3cfd55eae21-0-0-1 > div > p:nth-child(2)'
  ).text();
  const maghrib = $(
    '#panel-w5f3cfd55eaf9d-0-0-1 > div > p:nth-child(1)'
  ).text();
  const maghribJamaa = $(
    '#panel-w5f3cfd55eaf9d-0-0-1 > div > p:nth-child(2)'
  ).text();
  const isha = $('#panel-w5f3cfd55eb112-0-0-1 > div > p:nth-child(1)').text();
  const ishaJamaa = $(
    '#panel-w5f3cfd55eb112-0-0-1 > div > p:nth-child(2)'
  ).text();

  const startTimes = [fajr, sunrise, dhuhr, asr, maghrib, isha];
  const dirtyCongregationTimes = [
    fajrJamaa,
    dhuhrJamaa,
    asrJamaa,
    maghribJamaa,
    ishaJamaa,
  ];
  //remove "Jama'ah" from scraped text
  const congregationTimes = dirtyCongregationTimes.map((time) =>
    time.substring(7)
  );

  return [startTimes, congregationTimes];
}

module.exports = getTimes;
