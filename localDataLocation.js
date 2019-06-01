import mkdirp from 'mkdirp'

export const localDataLocation = () => {
    const osvar = process.platform;
    if (osvar == 'darwin') { //currently only macOS is supported.
        const apploc = `${require('os').homedir()}/Library/Caches/evertdespiegeleer/PrettyEarth`
        mkdirp(apploc, function(err) { 
            if(err) console.log(err)
        })
        return apploc
    }
}

export const applocation = () => {
    const osvar = process.platform;
    if (osvar == 'darwin') { //currently only macOS is supported.
        return __dirname.split('.app')[0]+'.app'
    }
}

export default false