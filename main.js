import { app, BrowserWindow } from 'electron';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    autoHideMenuBar: false,
    backgroundColor: '#ffffff'
  });

  const devUrl = 'http://localhost:5173';

  function loadDevURL(retries = 10) {
    mainWindow.loadURL(devUrl)
      .then(() => {
        console.log('URL cargada correctamente');
      })
      .catch(err => {
        if (retries > 0) {
          console.log('Servidor no listo, reintentando...');
          setTimeout(() => loadDevURL(retries - 1), 1000);
        } else {
          console.error('Error al cargar URL:', err);
        }
      });
  }

  loadDevURL();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
