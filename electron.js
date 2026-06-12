const { app, BrowserWindow } = require("electron");
const path = require("path");
const { fork } = require("child_process");

let mainWindow;
let backendProcess;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
  });

  mainWindow.loadFile(
    path.join(__dirname, "frontend/dist/index.html")
  );

}

app.whenReady().then(() => {

  // Start Backend
  backendProcess = fork(
    path.join(__dirname, "backend/app.js")
  );

  createWindow();

});

app.on("window-all-closed", () => {

  if (backendProcess) {
    backendProcess.kill();
  }

  app.quit();

});