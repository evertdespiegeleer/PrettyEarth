//access functions exported by start.js

const inElectron = (navigator.userAgent.toLowerCase().indexOf(' electron/')> -1);

//if(inElectron){
    const remote = require('electron').remote.require('./start.js')
//}

const setWallpaper = (cb) => {
    remote.setRandomWallPaper(()=>{
        remote.updateMapData()
        if(window.settings) { //update date
            window.settings.lastSetBg = (new Date).getTime()
            localStorage.setItem('settings', JSON.stringify(window.settings))
        }
        if(cb) cb()
    })
}

const getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

window.GMapsLink = 'https://maps.google.com/'

pageSwitchTo = (elemenetQuerySelector)=> {
    document.querySelector('.pagescroller').scrollTop = document.querySelector(elemenetQuerySelector).offsetTop
}

//MenuItemClicks
for (let e of document.querySelectorAll('.menubar > .el')) {
    e.addEventListener('click', () => {
        if(navigator.onLine){
            window.pageSwitchTo(e.getAttribute('link'))
            let isActive = (e.className.indexOf('active')>-1)
            if(!isActive) {
                for (let e of document.querySelectorAll('.menubar > .el')){e.className='el'} //set others inactive
                e.className='el active'
            }
        }
    })
}  

//GMapsLink
document.querySelector('.goToMaps').addEventListener('click', () => {
    window.open(window.GMapsLink);
})

//Update wallpaper btn
document.querySelector('button.newBg').addEventListener('click', () => {
    setWallpaper()
})

updateMapData = (jsondata) => {
    const data = JSON.parse(jsondata)
    document.querySelector('.map > .mapimg').setAttribute('src', data.image)
    window.GMapsLink = data.map
    let wikiSearchTerm;
    if(data.region == '') { //special case
        document.querySelector('.default > .info .region').innerHTML = data.country
        document.querySelector('.default > .info .country').innerHTML = ''
        wikiSearchTerm = data.country
    }
    else { //normal case
        document.querySelector('.default > .info .country').innerHTML = data.country
        document.querySelector('.default > .info .region').innerHTML = data.region
        wikiSearchTerm = data.region
    }
    //get info about region from wikipedia
    getJSON(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURI(wikiSearchTerm)}`, function(err,data){
    let WikiText;
    if(!err) {
        try{
            WikiText = data.query.pages[Object.keys(data.query.pages)[0]].extract || 'WikiText not available.'
        }
        catch(e) {
            WikiText = 'WikiText not available.'
        }
    }
    else {
        WikiText = 'WikiText not available.'
    }
    document.querySelector('.default > .info .wikitext').innerHTML = WikiText
})
}

window.checks = () => { //Executes every time the window opens
    //Scroll all elements to 0 (top)
    for (let e of document.querySelectorAll('*:not(.pagescroller)')) {
        e.scrollTop = 0
    }
    (()=>{ //Check the internet connection
        if(navigator.onLine) {
            //Connected
            if(document.querySelector('.pagescroller').scrollTop == document.querySelector('.no_internet_connection').offsetTop) {
                document.querySelectorAll('.el')[0].click() //Go to page 1
            }
        }    
        else {
            //Not connected
            pageSwitchTo('.no_internet_connection')
            for (let e of document.querySelectorAll('.menubar > .el')){e.className='el'} //set every tab inactive
        }
    })()
}