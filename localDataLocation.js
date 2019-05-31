import mkdirp from 'mkdirp'

const localDataLocation = () => {
    const osvar = process.platform;
    if (osvar == 'darwin') { //currently only macOS is supported.
        const apploc = `${require('os').homedir()}/Library/Caches/evertdespiegeleer/PrettyEarth`
        mkdirp(apploc, function(err) { 
            if(err) console.log(err)
        })
        return apploc
    }
}

export default localDataLocation