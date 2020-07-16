const {app, BrowserWindow} = require("electron")
const path = require("path")

let mainWindow

function createMainWindow() {
	const window = new BrowserWindow({
		webPreferences: {
			preload: path.join(app.getAppPath(), "js/preload.js")
		},
		backgroundColor: 0x1b1b1b,
		autoHideMenuBar: true,
		show: false
	})

	window.loadFile("app/index.html")
	window.on("closed", () => { mainWindow = null })

	window.show()
	return window
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
	if (mainWindow == null) mainWindow = createMainWindow()
})

app.on("ready", () => {
	mainWindow = createMainWindow()
})
