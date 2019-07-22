/* global setWallpaper, mixpanel */

const intervalCheck = () => {
  if (navigator.onLine) {
    if (window.settings) {
      if (window.settings.autoChange) {
        if ((new Date()).getTime() >= window.settings.lastSetBg + window.settings.interval * 1000) {
          setWallpaper()
        }
      }
    }
    mixpanel.track('alive')
  }
}

setInterval(intervalCheck, 60 * 1000) // check every minute
// intervalCheck() //check at start
