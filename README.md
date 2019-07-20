PrettyEarth :earth_africa:
===
![](https://img.shields.io/david/evertdespiegeleer/PrettyEarth.svg) ![](https://img.shields.io/github/languages/code-size/evertdespiegeleer/PrettyEarth.svg) ![](https://img.shields.io/github/license/evertdespiegeleer/PrettyEarth.svg) ![](https://img.shields.io/github/release/evertdespiegeleer/PrettyEarth.svg)

Our planet is a beautiful place. The [Google Chrome Earth View extension](https://chrome.google.com/webstore/detail/earth-view-from-google-ea/bhloflhklmhfpedakmangadcdofhnnoh) by Google is a wonderful way to deliver stunning satellite images to us every time we open a new tab, inspiring us on our next web adventure. But why stop there? Why don't get impressed by these the wonders of the earth as well when gazing at this more important rectangle on our screen, our **wallpaper**. PrettyEarth now grants you the opportunity to bring our blue marble to your desktop.

## Technical crap

### Structure

PrettyEarth is [Electron](https://electronjs.org/) based. It is, to be more particular, based around the [menubar](https://www.npmjs.com/package/menubar)-package.

Currently, only macOS is supported. However, adaptation on other operating systems will be provided soon. Few modifications are needed.

### known issues and future developements
- [ ] [macOS Mojave white line issue in dark mode](https://github.com/electron/electron/issues/15008) (Electron related) 
 The Electron team have done what they could. The problem is reduced. The infamous line has become very thin and less noticeable. The underlying problem is OS-related. [Apple will probably fix the issue in Catalina.](https://github.com/electron/electron/issues/13164#issuecomment-500081463)
- [ ] Windows support

## Build

Use the package manager [npm](https://www.npmjs.com/) to install dependencies and build PrettyEarth.

```bash
npm install
npm run package-mac
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
PrettyEarth is available under the [MIT](https://choosealicense.com/licenses/mit/) license.

[![Buy me a coffee](https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png "Buy me a coffee")](https://www.buymeacoffee.com/evertds "Buy me a coffee")