const {
  contextBridge,
  ipcRenderer
} = require("electron");

const fs = require("fs");
let images = fs.readdirSync(`${__dirname}/view/images/gallery`);

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "sendToMain", async (method,payload) => {
    return new Promise(function(resolve,reject){
      ipcRenderer.send("toMain", {
        method: method,
        payload: payload
      });
      ipcRenderer.on("fromMain", (event,args) => {
        return resolve(args)
      });
    })
  }
);

contextBridge.exposeInMainWorld(
  "getImages", () => {
  return images;
})
