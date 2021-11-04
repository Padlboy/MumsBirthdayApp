const { channel } = require('diagnostics_channel');
const { ipcMain, app, BrowserWindow } = require('electron')
const path = require('path')
const logic = require("./logic");
let win;
function createWindow () {
    return new BrowserWindow({
      fullscreen: true,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(app.getAppPath(), 'preload.js')
      }
    })
}

app.whenReady().then(() => {
    win = createWindow();
    win.loadFile('view/authquiz.html')
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0){
        win = createWindow();
        win.loadFile('view/authquiz.html')
      }
    })
  })


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("toMain", (event, args) => {

  let response;
    if(logic.isValidRendererMessage(args)){
      if(args.method.includes("Password")){
        let isValid = logic.checkPassword(args.method.replace("Password",""),args.payload);
        response = {
          method: args.method,
          errorOccured: false,
          payload: isValid
        }
      }
    }
    else {
      response = {
        method: "unknown",
        errorOccured: true,
        error: new Error("Unknown method"),
        payload: null
      }
    }

    if(response.method == "thirdPassword" && response.payload){
      win.loadFile('view/gallery.html')
    }    
    win.webContents.send("fromMain", response);
    
});

