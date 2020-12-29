const express = require('express')
const app = express()

const scraper = require('./scraper')
const converter = require('./utils/24hrConverter')


app.get('/', async (req, res) => {

const [times, jTimes] = await scraper()

const [fajr, sunrise, ...othertimes] = times

const convertedTimes = othertimes.map(time => converter(time))

const [dhuhr, asr, maghrib, isha] = convertedTimes

const prayerTimes = {
    fajr,
    sunrise,
    dhuhr,
    asr,
    maghrib,
    isha
}

const [fajrJamaa, ...otherJTimes] = jTimes

const convertedJTimes = otherJTimes.map(time => converter(time))

const [dhuhrJamaa, asrJamaa, maghribJamaa, ishaJamaa] = convertedJTimes

const jamaaTimes = {
    fajrJamaa,
    dhuhrJamaa,
    asrJamaa,
    maghribJamaa,
    ishaJamaa
}

res.json({prayerTimes, jamaaTimes})



})

app.listen(3000, () => console.log('server started'))

