const electron = require('electron')
const {app, BrowserWindow, Menu, ipcMain} = electron
const path = require('path')
const url = require('url')
const  ipc = electron.ipcRenderer

const express = require('express');
const restApp = express();


//Routes
restApp.get('/', (req, res) =>{
  res.send('We are on home ');

})

//How to start listing to server
console.log(restApp.listen(3000));





// Template for the Menu
let menuTemplate = [
  {
    label: 'Application',
    submenu: [
      {
        label: 'About',
        click: () => {
          openAboutWindow()
        }
      }
    ]
  }
]

// Keep a global reference so the garbage collector does not destroy our app
let mainWindow;
let addWindow;

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { 
      enableRemoteModule: true,
         nodeIntegration: true
    } 
  })

  //Garbage collection handele
  mainWindow.on('close', function(){
    mainWindow = null;
  });

  // Load the index.html file
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the devtools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () =>{
    mainWindow = null;
  })


  // Set up the menu
  var menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

//Handle create Add student window
function createStudentWindow(){
  //create new window
  addWindow = new BrowserWindow({
    width: 500,
    height: 400,
    title: 'Add Student'
  });
  //load html into window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addStudent.html'),
    protocol: 'file',
    slashes: true

  }));

}

//Add Student
ipcMain.on('item:add', function(e, item){
  console.log(item);
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});

// Opens the about window
function openAboutWindow() {

  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 400,
    height: 200
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}

// Create the window then the app is ready
app.on('ready', () => {
  createWindow()
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Reopen the app on macOS
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

//Add developer tools  item if not in production
if(process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'command+I':
        'ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'relode'
      }
    ]
  })
}
