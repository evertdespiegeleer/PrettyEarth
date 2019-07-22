/* global localStorage, mixpanel, XMLHttpRequest */

// access functions exported by start.js

// if(inElectron){
const remote = require('electron').remote.require('./start.js')
// }

const prettyEarthVersion = '1.0.3'

mixpanel.register({
  version: prettyEarthVersion
})
mixpanel.people.set({
  version: prettyEarthVersion
})

if (!localStorage.getItem('device_id')) { // Identify user
  const uniqueId = `${(new Date()).getTime() + String(Math.floor(Math.random() * 100000000000))}`
  localStorage.setItem('device_id', uniqueId)
  mixpanel.people.set({
    PE_device_id: uniqueId,
    first_launch_TS: `${(new Date()).getTime()}`,
    first_launch: `${(Date())}`,
    os_uname: `${require('os').userInfo().username}`,
    isDev: false
  })
  mixpanel.identify(uniqueId)
  mixpanel.register({
    PE_device_id: uniqueId,
    first_launch_TS: `${(new Date()).getTime()}`,
    first_launch: `${(Date())}`,
    os_uname: `${require('os').userInfo().username}`,
    isDev: false
  })
  mixpanel.track('user_init')
} else {
  mixpanel.identify(localStorage.getItem('device_id'))
}

const setWallpaper = (cb) => {
  remote.setRandomWallPaper(() => {
    remote.updateMapData()
    if (window.settings) { // update date
      window.settings.lastSetBg = (new Date()).getTime()
      localStorage.setItem('settings', JSON.stringify(window.settings))
    }
    if (cb) cb()
  })
  mixpanel.track('wallpaper_set')
}

const getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function () {
    var status = xhr.status
    if (status === 200) {
      callback(null, xhr.response)
    } else {
      callback(status, xhr.response)
    }
  }
  xhr.send()
}

window.GMapsLink = 'https://maps.google.com/'

window.pageSwitchTo = (elemenetQuerySelector) => {
  document.querySelector('.pagescroller').scrollTop = document.querySelector(elemenetQuerySelector).offsetTop
}

// MenuItemClicks
for (const e of document.querySelectorAll('.menubar > .el')) {
  e.addEventListener('click', () => {
    if ((navigator.onLine) && (!e.classList.contains('unclickable'))) {
      window.pageSwitchTo(e.getAttribute('link'))
      const isActive = (e.classList.contains('active'))
      if (!isActive) {
        for (const e of document.querySelectorAll('.menubar > .el')) {
          if (e.classList.contains('active')) e.classList.remove('active') // set others inactive
        }
        e.classList.add('active')
      }
    }
  })
}

// GMapsLink
document.querySelector('.goToMaps').addEventListener('click', () => {
  window.open(window.GMapsLink)
})

// Update wallpaper btn
document.querySelector('.setBg button.newBg').addEventListener('click', () => {
  const e = document.querySelector('.setBg button.newBg')
  setWallpaper()
  e.classList.add('load')
})
document.querySelector('.first_launch button.newBg').addEventListener('click', () => {
  const e = document.querySelector('.first_launch button.newBg')
  if (!e.classList.contains('unclickable')) { setWallpaper() }
  e.classList.add('unclickable')
  e.innerHTML = 'Nice!'
  setTimeout(() => { document.querySelectorAll('.el')[1].click() }, 1500)
})

/* eslint-disable no-unused-vars */
const updateMapData = (jsondata) => {
  const data = JSON.parse(jsondata)
  if (data != null) {
    try {
      document.querySelectorAll('.menubar > .el')[0].classList.remove('unclickable')
      document.querySelector('.setBg button.newBg').classList.remove('load')
    } catch (e) {}
    document.querySelector('.map > .mapimg').setAttribute('src', data.image)
    window.GMapsLink = data.map
    let wikiSearchTerm
    if (data.region === '') { // special case
      document.querySelector('.default > .info .region').innerHTML = data.country
      document.querySelector('.default > .info .country').innerHTML = ''
      wikiSearchTerm = data.country
    } else { // normal case
      document.querySelector('.default > .info .country').innerHTML = data.country
      document.querySelector('.default > .info .region').innerHTML = data.region
      wikiSearchTerm = data.region
    }
    // get info about region from wikipedia
    getJSON(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURI(wikiSearchTerm)}`, function (err, data) {
      let WikiText
      if (!err) {
        try {
          WikiText = data.query.pages[Object.keys(data.query.pages)[0]].extract || 'WikiText not available.'
        } catch (e) {
          WikiText = 'WikiText not available.'
        }
      } else {
        WikiText = 'WikiText not available.'
      }
      document.querySelector('.default > .info .wikitext').innerHTML = WikiText
    })
  } else { // First ever launch
    // Set unique ID
    document.querySelectorAll('.menubar > .el')[0].classList.add('unclickable')
    for (const e of document.querySelectorAll('.menubar > .el')) {
      if (e.classList.contains('active')) e.classList.remove('active') // set every tab inactive
    }
    window.pageSwitchTo('.first_launch')
  }
}

window.checks = () => { // Executes every time the window opens
  // Scroll all elements to 0 (top)
  for (const e of document.querySelectorAll('*:not(.pagescroller)')) {
    e.scrollTop = 0
  }
  (() => { // Check the internet connection
    if (navigator.onLine) {
      mixpanel.track('window_opened')
      // Connected
      if (document.querySelector('.pagescroller').scrollTop === document.querySelector('.no_internet_connection').offsetTop) {
        document.querySelectorAll('.el')[0].click() // Go to page 1
      }
    } else {
      // Not connected
      window.pageSwitchTo('.no_internet_connection')
      for (const e of document.querySelectorAll('.menubar > .el')) {
        if (e.classList.contains('active')) e.classList.remove('active') // set every tab inactive
      }
    }
  })()
}

mixpanel.track('app_started')
