const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

const electron = require('electron');

//const app = electron.app;

const Menu = electron.Menu;
let menuTemplate = require('./menuTemplate');


let mainWindow, menu, dockMenu;


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
    mainWindow = null
  })

  if (!menu) setMenu();
  if (!dockMenu) setDock();

  toggleFileTasks(true);
  toggleNewWindowTask(false);
}

let toggleFileTasks = isEnabled => {
  // The 'File' menu should only be available if there is an open window
  menu.items
    .find(item => item.label === 'File')
    .submenu.items
    .forEach(subItem => subItem.enabled = isEnabled);
}

let toggleNewWindowTask = isEnabled => {
  // The 'New Window' task in the main menu and dock menu
  // should only be available if there are no open windows
  let newWindowMenu = menu.items
    .find(item => item.label === 'Window')
    .submenu.items
    .find(subItem => subItem.label === 'New');

  let dockWindowMenu = dockMenu.items
    .find(item => item.label === 'New Window');

  newWindowMenu.enabled = isEnabled;
  dockWindowMenu.enabled = isEnabled;
}

let setMenu = () => {
  // Set custom click handlers for menu tasks
  let fileMenu = menuTemplate
    .find(item => item.label === 'File');

  fileMenu.submenu
    .find(item => item.label === 'Open')
    .click = () => mainWindow.webContents.send('open-file')

  fileMenu.submenu
    .find(item => item.label === 'Save As...')
    .click = () => mainWindow.webContents.send('save-file')

  menuTemplate
    .find(item => item.label === 'Window')
    .submenu
    .find(subItem => subItem.label === 'New')
    .click = () => createWindow()

  menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

let setDock = () => {
  // Create a 'New Window' task in the dock menu (OSX only)
  dockMenu = Menu.buildFromTemplate([
    { label: 'New Window', click: createWindow }
  ]);
  //electron.app.dock.setMenu(dockMenu);
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
  if (mainWindow === null) {
    createWindow()
  }
})
