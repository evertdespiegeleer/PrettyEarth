const listLocation = 'https://raw.githubusercontent.com/limhenry/earthview/master/earthview.json'
import request from 'request'
import wallpaper from 'wallpaper'
import https from 'https'
import fs from 'fs'

export default () => {
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
            const downloadloc = `./images/${url.split('/')[url.split('/').length-1]}`
            const file = fs.createWriteStream(downloadloc)
            https.get(url, (response) => {
                response.pipe(file).on('close', async () => {
                    //Image downloaded
                    //Set as wallpaper
                    await wallpaper.set(downloadloc)
                    //Remove file
                    fs.unlink(downloadloc, (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                        //file removed
                      })
                })
            })
            
        }
    })
}