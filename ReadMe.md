### Prayer times API

This is a simple web app that scrapes some data from a website, transforms it into a more palatable manner and exposes it as a node/express API to be used.

https://wiseprayertimes.herokuapp.com/

API endpoint: /getPrayerTimes
___

Initially scraping was part of the electron cross platform desktop app, but after learning React Native I didn't want to keep repeating the scraper function. This way I can use the same API but use it across different platforms without having to scrape on each platform, whether it be web, desktop, mobile or even TV.
