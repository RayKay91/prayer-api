const express = require('express')
const app = express()
const path = require('path')
const scraper = require('./scraper')
const converter = require('./utils/24hrConverter')
const getDate = require('./utils/getDate')

const PORT = process.env.PORT || 3000

// app.use(express.static(path.join(__dirname, 'pages')))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'pages/index.html'))
// })


app.get('/', async (req, res) => {

    //scrape times

    const [times, jTimes] = await scraper()

    const [fajr, sunrise, ...othertimes] = times
    const [fajrJamaa, ...otherJTimes] = jTimes

    //convert necessary times to 24hrs
    const convertedTimes = othertimes.map(time => converter(time))
    const convertedJTimes = otherJTimes.map(time => converter(time))

    const [dhuhr, asr, maghrib, isha] = convertedTimes
    const [dhuhrJamaa, asrJamaa, maghribJamaa, ishaJamaa] = convertedJTimes

    const date = getDate()

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

