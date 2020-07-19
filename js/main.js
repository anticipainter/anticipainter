const {app, BrowserWindow} = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow

function createMainWindow() {
	const window = new BrowserWindow({
		webPreferences: {
			enableRemoteModule: true,
			preload: path.join(app.getAppPath(), "js/preload.js")
		},
		minWidth: 675,
		minHeight: 500,
		backgroundColor: 0x1b1b1b,
		autoHideMenuBar: true,
		show: false
	})

	if (!isDev) window.removeMenu()
	window.loadFile("app/index.html")
	window.on("closed", () => { mainWindow = null })

	window.show()
	return window
}

app.on("window-all-closed", () => {
	/* if (process.platform !== "darwin") */ app.quit()
})

app.on("activate", () => {
	if (mainWindow == null) mainWindow = createMainWindow()
})

app.on("ready", () => {
	mainWindow = createMainWindow()
})
