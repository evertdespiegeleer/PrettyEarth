PrettyEarth :earth_africa:
===

Our planet is a beautiful place. The [Google Chrome Earth View extension](https://chrome.google.com/webstore/detail/earth-view-from-google-ea/bhloflhklmhfpedakmangadcdofhnnoh) by Google is a wonderful way to deliver stunning satellite images to us every time we open a new tab, inspiring us on our next web adventure. But why stop there? Why don't get impressed by these the wonders of the earth as well when gazing at this more important rectangle on our screen, our **wallpaper**. PrettyEarth now grants you the opportunity to bring our blue marble to your desktop.

## Technical crap

### Structure

PrettyEarth is [Electron](https://electronjs.org/) based. It is, to be more particular, based around the [menubar](https://www.npmjs.com/package/menubar)-package.

Currently, only macOS is supported. However, adaptation on other operating systems will be provided soon. Few modifications are needed.

### known issues and future developements
- [ ] [macOS Mojave titlebar issue](https://github.com/electron/electron/issues/15008) (Electron related)
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