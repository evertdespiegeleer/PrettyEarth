import util from 'util'
import path from 'path'
const exec = util.promisify(require('child_process').exec)
const setWallpaper = (downloadloc, cb) => {
  const osvar = process.platform
  const command = `osascript -e 'tell application "Finder" to set desktop picture to POSIX file "${path.resolve(downloadloc)}"'`
  if (osvar === 'darwin') { // currently only macOS is supported.
    exec(command, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log(err)
        return
      }
      if (cb) cb()
    })
  }
}

export default setWallpaper
