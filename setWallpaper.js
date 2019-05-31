import util from 'util'
const exec = util.promisify(require('child_process').exec)
import path from 'path'
const setWallpaper = (downloadloc, cb) => {
    const osvar = process.platform;
    let command = `osascript -e 'tell application "Finder" to set desktop picture to POSIX file "${path.resolve(downloadloc)}"'`
    if (osvar == 'darwin') { //currently only macOS is supported.
        exec(command, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                console.log(err)
                return;
            }
            if(cb) cb()
        });
    }
}

export default setWallpaper