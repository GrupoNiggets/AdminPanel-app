import { app, BrowserWindow, Menu, shell } from 'electron';

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

  const menuTemplate = [
    {
      label: 'Inicio',
      click: () => {
        console.log('Has hecho clic en Inicio');
      }
    },
    {
      label: 'Módulos',
      submenu: [
        {
          label: 'Bugs',
          click: () => {
            mainWindow.loadURL('/#/modules/bugs');
            console.log('Has hecho clic en el módulo Bugs');
          }
        },
        {
          label: 'Chat',
          click: () => {
            console.log('Has hecho clic en el módulo Chat');
          }
        },
        {
          label: 'Posts',
          click: () => {
            console.log('Has hecho clic en el módulo Posts');
          }
        },
        {
          label: 'Status',
          click: () => {
            console.log('Has hecho clic en el módulo Status');
          }
        },
        {
          label: 'Usuarios',
          click: () => {
            console.log('Has hecho clic en el módulo Usuarios');
          }
        }
      ]
    },
    {
      label: 'Información',
      submenu: [
        {
          label: 'Informe',
          click: () => {
            console.log('Has hecho clic en Información');
          }
        },
        {
          label: 'Github API',
          click: () => {
            console.log('Has hecho clic en el enlace a Github API');
          },
          click: async () => {
            await shell.openExternal('https://github.com/GrupoNiggets/AdminPanel-api');
          }
        },
        {
          label: 'Github APP',
          click: () => {
            console.log('Has hecho clic en el enlace a Github APP');
          },
          click: async () => {
            await shell.openExternal('https://github.com/GrupoNiggets/AdminPanel-app');
          }
        },
        {
          label: 'Documentación',
          click: () => {
            console.log('Has hecho clic en Documentación');
          }
        },
        { type: 'separator' },
        {
          label: 'Herramientas de desarrollador',
          click: () => {
            mainWindow.webContents.openDevTools();
            console.log('Has hecho clic en las Herramientas de desarrollador');
          }
        }
      ]
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);


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