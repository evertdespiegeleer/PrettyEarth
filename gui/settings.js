(() => {
    const inElectron = (navigator.userAgent.toLowerCase().indexOf(' electron/')> -1)
    if(inElectron){
        const remote = require('electron').remote.require('./start.js')
        const settingsElms = document.querySelectorAll('.box.settings .setsbox .userset')
        const loadSettings = () => {
            if(localStorage.getItem('settings')) {
                window.settings = JSON.parse(localStorage.getItem('settings'))
            }
            else {
                let defaultsettings = {
                    'interval': 3600,
                    'autoChange': false,
                    'startOnBoot': true,
                    'lastSetBg': 0,
                }
                window.settings = defaultsettings
                localStorage.setItem('settings', JSON.stringify(defaultsettings))
            }
            //put settings in the gui
            document.querySelector('.box.settings .setsbox .userset.interval').value = window.settings.interval
            document.querySelector('.box.settings .setsbox .userset[name="autochange"]').checked = window.settings.autoChange
            document.querySelector('.box.settings .setsbox .userset[name="start_on_boot"]').checked = window.settings.startOnBoot
        }
        loadSettings() //Load on start
        const checkSettings = () => {
            let settings = {
                'interval': document.querySelector('.box.settings .setsbox .userset.interval').value,
                'autoChange': document.querySelector('.box.settings .setsbox .userset[name="autochange"]').checked,
                'startOnBoot': document.querySelector('.box.settings .setsbox .userset[name="start_on_boot"]').checked,
                'lastSetBg': window.settings.lastSetBg,
            }
            window.settings = settings
            localStorage.setItem('settings', JSON.stringify(window.settings))
            if(intervalCheck) intervalCheck()
        }
        for(let e of settingsElms) {
            e.addEventListener('change', checkSettings)
        }
        
        document.querySelector('.box.settings .setsbox .quit').addEventListener('click', () => {
            remote.quit()
        })
    }
})()