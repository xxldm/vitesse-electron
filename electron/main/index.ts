import type { MenuItem } from "electron";
import { app, BrowserWindow, Menu, Tray } from "electron";
import { join } from "path";

// VITE_DEV_SERVER_PORT 是 vite-plugin-electron 插件定义,取自vite开发服务器配置,与用户配置文件中的环境变量无直接关联
const env = import.meta.env as {
  VITE_DEV_SERVER_HOST: string
  VITE_DEV_SERVER_PORT: string
  VITE_DEV_SERVER_URL: string
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
};

if (process.platform === "win32") {
  app.setAppUserModelId(app.getName());
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

app.whenReady().then(ready);

/**
 * 应用准备就绪
 * * 创建窗口 *
 * * 创建托盘图标 *
 * * 创建菜单 *
 */
function ready() {
  createWindow();
  createTray();
  createMenu();
}

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(app.getAppPath(), "dist/index.html"));
  } else {
    win.loadURL(env.VITE_DEV_SERVER_URL);
  }
}

/**
 * 创建托盘栏图标
 */
function createTray() {
  const tray = new Tray(join(app.getAppPath(), app.isPackaged ? "dist/favicon-512x512.png" : "public/favicon-512x512.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "退出",
      click() {
        app.quit();
      },
    },
  ]);
  tray?.setContextMenu(contextMenu);
  tray?.setToolTip("工具箱");
}

/**
 * 创建主菜单
 */
function createMenu() {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "切换开发者工具",
        accelerator: "F12",
        click(
          item: MenuItem,
          focusedWindow: BrowserWindow | undefined,
        ) {
          if (focusedWindow) {
            focusedWindow.webContents.openDevTools();
          }
        },
      },
    ]),
  );
}

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});
