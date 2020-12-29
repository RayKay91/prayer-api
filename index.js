const express = require('express')
const app = express()

const scraper = require('./scraper')
const converter = require('./utils/24hrConverter')

const PORT = process.env.PORT || 3000


app.get('/', async (req, res) => {

    //scrape times

    const [times, jTimes] = await scraper()

    const [fajr, sunrise, ...othertimes] = times
    const [fajrJamaa, ...otherJTimes] = jTimes
    //convert times to 24hrs
    const convertedTimes = othertimes.map(time => converter(time))
    const convertedJTimes = otherJTimes.map(time => converter(time))

    const [dhuhr, asr, maghrib, isha] = convertedTimes
    const [dhuhrJamaa, asrJamaa, maghribJamaa, ishaJamaa] = convertedJTimes

    const prayerTimes = {
        fajr,
        sunrise,
        dhuhr,
        asr,
        maghrib,
        isha
    }
    const jamaaTimes = {
        fajrJamaa,
        dhuhrJamaa,
        asrJamaa,
        maghribJamaa,
        ishaJamaa
    }

    res.json({prayerTimes, jamaaTimes})

})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

