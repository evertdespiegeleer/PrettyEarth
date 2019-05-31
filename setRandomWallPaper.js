const listLocation = 'https://raw.githubusercontent.com/limhenry/earthview/master/earthview.json'
import request from 'request'
import https from 'https'
import fs from 'fs'
import setWallpaper from './setWallpaper'
import localDataLocation from './localDataLocation'
const dataloc = localDataLocation()
export default (cb) => {
    request({
        url: listLocation,
        json: true
    },
    (error, response, body) => {
        if (!error && response.statusCode === 200) {
            //List loaded
            const list = body;
            //Choose random image (+data)
            const listObj = list[Math.round(Math.random()*list.length)]
            const url = listObj.image;
            const downloadloc = `${dataloc}/${url.split('/')[url.split('/').length-1]}`
            //const downloadloc = `./images/bg.jpg`
            let file = fs.createWriteStream(downloadloc)
            //console.log('wallpaper download')
            request(url, {encoding: 'binary'}, function(error, response, body) {
                fs.writeFile(downloadloc, body, 'binary', async function (err) {
                    if(!err) {
                        //console.log('download complete')
                        //Image downloaded
                        //Set as wallpaper
                        setWallpaper(downloadloc, (err) => {
                            //console.log('wallpaper set')
                            //Remove file
                            fs.unlink(downloadloc, (err) => {
                                if (err) {
                                    console.error(err)
                                    return
                                }
                                //console.log('wallpaper file removed')
                                //file removed, wallpaper set successfully!
                                //remove old data
                                try {
                                    fs.unlinkSync(`${dataloc}/imageData.json`)
                                } catch(err) {
                                }
                                //file removed
                                //console.log('old meta removed')
                                //save data about wallpaper
                                fs.writeFile(`${dataloc}/imageData.json`, JSON.stringify(listObj), function(err) {
                                    if(err) {
                                        console.log(err)
                                    }
                                    //FILE SAVED!
                                    //console.log('new meta saved')
                                    if(cb) {
                                        cb() //Callback
                                    }
                                });
                            })
                        })
                    }
                });
            });
        }
    })
}