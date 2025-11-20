import { app, BrowserWindow, Menu, shell } from "electron";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: false,
    backgroundColor: "#ffffff",
  });

  const DevUrl = "http://localhost:5173";

  const menuTemplate = [
    {
      label: "Inicio",
      click: async () => {
        mainWindow.loadURL(`${DevUrl}/#/`);
        console.log("Has hecho clic en Inicio");
      },
    },
    {
      label: "Módulos",
      submenu: [
        {
          label: "Bugs",
          click: async () => {
            mainWindow.loadURL(`${DevUrl}/#/modules/bugs`);
            console.log("Has hecho clic en el módulo Bugs");
          },
        },
        {
          label: "Chat",
          click: async () => {
            mainWindow.loadURL(`${DevUrl}/#/modules/chat`);
            console.log("Has hecho clic en el módulo Chat");
          },
        },
        {
          label: "Posts",
          click: async () => {
            mainWindow.loadURL(`${DevUrl}/#/modules/posts`);
            console.log("Has hecho clic en el módulo Posts");
          },
        },
        {
          label: "Status",
          click: async () => {
            mainWindow.loadURL(`${DevUrl}/#/modules/status`);
            console.log("Has hecho clic en el módulo Status");
          },
        },
        {
          label: "Usuarios",
          click: async () => {
            mainWindow.loadURL(`${DevUrl}/#/modules/users`);
            console.log("Has hecho clic en el módulo Usuarios");
          },
        },
      ],
    },
    {
      label: "Información",
      submenu: [
        {
          label: "Informe",
          click: async () => {
            mainWindow.loadURL(`${DevUrl}/#/informacion/informe`);
            console.log("Has hecho clic en Informe");
          },
        },
        {
          label: "Documentación",
          submenu: [
            {
              label: "API",
              click: async () => {
                mainWindow.loadURL(`http://localhost:3000/api/docs/#/`);
                console.log("Has hecho clic en API");
              },
            },
            {
              label: "How-to-guide",
              click: async () => {
                mainWindow.loadURL(
                  `${DevUrl}/#/informacion/documentacion/howToGuide`
                );
                console.log("Has hecho clic en How-to-guide");
              },
            },
            {
              label: "Explicación estructural",
              click: async () => {
                mainWindow.loadURL(
                  `${DevUrl}/#/informacion/documentacion/estructura`
                );
                console.log("Has hecho clic en Explicación estructural");
              },
            },
            {
              label: "Máquina Virtual",
              click: async () => {
                mainWindow.loadURL(
                  `${DevUrl}/#/informacion/documentacion/maquinaVirtual`
                );
                console.log("Has hecho clic en Máquina Virtual");
              },
            },
          ],
        },
        { type: "separator" },
        {
          label: "Herramientas de desarrollador",
          click: () => {
            mainWindow.webContents.openDevTools();
            console.log("Has hecho clic en las Herramientas de desarrollador");
          },
        },
      ],
    },

    {
      label: "Repositorios",
      submenu: [
        {
          label: "Github API",
          click: () => {
            console.log("Has hecho clic en el enlace a Github API");
          },
          click: async () => {
            await shell.openExternal(
              "https://github.com/GrupoNiggets/AdminPanel-api"
            );
          },
        },
        {
          label: "Github APP",
          click: () => {
            console.log("Has hecho clic en el enlace a Github APP");
          },
          click: async () => {
            await shell.openExternal(
              "https://github.com/GrupoNiggets/AdminPanel-app"
            );
          },
        },
      ],
    },

    { role: "quit", label: "Salir" },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);

  function loadDevURL(retries = 10) {
    mainWindow
      .loadURL(DevUrl)
      .then(() => {
        console.log("URL cargada correctamente");
      })
      .catch((err) => {
        if (retries > 0) {
          console.log("Servidor no listo, reintentando...");
          setTimeout(() => loadDevURL(retries - 1), 1000);
        } else {
          console.error("Error al cargar URL:", err);
        }
      });
  }

  loadDevURL();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
