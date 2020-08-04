const {app, BrowserWindow, Menu} = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow, updateInterval = false

function createMainWindow() {
	const window = new BrowserWindow({
		webPreferences: {
			enableRemoteModule: true,
			preload: path.join(app.getAppPath(), "js/preload.js")
		},
		minWidth: 480,
		minHeight: 360,
		backgroundColor: "#263238",
		autoHideMenuBar: true,
		show: false
	})

	if (!isDev) {
		// window.removeMenu()
		Menu.setApplicationMenu(Menu.buildFromTemplate([
			{
				label: "Window",
				submenu: [
					{role: "minimize"},
					{role: "close"},
					{type: "separator"},
					{role: "togglefullscreen"}
				]
			}
		]))
	}
	window.loadFile("app/index.html")
	window.on("closed", () => { mainWindow = null })

	updateInterval = true
	startUpdate(() => {
		if (!window.isDestroyed()) window.webContents.send("update", "run")
	})

	window.on("ready-to-show", window.show)
	return window
}

app.on("window-all-closed", () => {
	/* if (process.platform !== "darwin") */ app.quit()
})

app.on("quit", () => {
	stopUpdate()
})

app.on("activate", () => {
	if (mainWindow == null) mainWindow = createMainWindow()
})

app.on("ready", () => {
	mainWindow = createMainWindow()
})

let updateLast = new Date()
let framerate = Math.floor(1000 / 60)
function startUpdate(callback) {
	if (!updateInterval) return
	callback()
	let updateNow = new Date()
	let delta = updateNow - updateLast
	updateLast = updateNow
	let time = delta > framerate ? 2 * framerate - delta : framerate
	setTimeout(startUpdate.bind(this, callback), time - 1)
}

function stopUpdate() {
	updateInterval = false
}
