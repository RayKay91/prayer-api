const express = require('express')
const app = express()
const path = require('path')
const fsPromises = require('fs').promises
const scraper = require('./scraper')
const converter = require('./utils/24hrConverter')


const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'pages')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
})


app.get('/getPrayerTimes', async (req, res) => {


        const d = new Date()
        const currDate = d.getDate()

        const pathToTimesFile = path.join(__dirname, `logs/day ${currDate}.json`)
        


        const logFiles = await fsPromises.readdir(path.join(__dirname, 'logs'))
       
    
        const todaysTimesExist = logFiles.includes('day ' + currDate + '.json')
       


        if (todaysTimesExist){
           
            
           res.sendFile(pathToTimesFile)

        } else {

    //scrape times

    const [times, jTimes] = await scraper()

    const [fajr, sunrise, ...othertimes] = times
    const [fajrJamaa, ...otherJTimes] = jTimes

    //convert necessary times to 24hrs
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
    const allTimes = {prayerTimes, jamaaTimes}

    await fsPromises.writeFile(pathToTimesFile, JSON.stringify(allTimes))

    console.log('New times written to file')

    res.sendFile(pathToTimesFile)

}

})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

