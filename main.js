const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

let win;
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './maindb.db'
  }

});
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, show: false })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.once("ready-to-show", () => { mainWindow.show() })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  ipcMain.on("mainWindowLoaded", function () {
    // let result = knex.select("FirstName").from("Users")
    // result.then(function (rows) {
    //   mainWindow.webContents.send("resultSent", rows);
    // })
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})