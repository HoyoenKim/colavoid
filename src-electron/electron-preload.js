/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  receive: (channel, func) => {
    let validChannels = ["f", "s"]; // IPC채널들 추가
    if (validChannels.includes(channel)) {
      console.log(channel);
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, (event, ...args) => func(...args));
      return () => {
        ipcRenderer.removeAllListener(channel, subscription);
      };
    }
  },
});
