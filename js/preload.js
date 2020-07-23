const fs = require("fs")
const path = require("path")
const shell = require("electron").shell
const userDataPath = require("electron").remote.app.getPath("userData");

Preferences = class {
	constructor(opts) {
		this.path = path.join(userDataPath, opts.configName + ".json")
		this.data = parseDataFile(this.path, opts.defaults)
	}

	getParsed(keys) {
		let data = this.data
		while (keys.length > 1) data = data[keys.pop()]
		return data
	}

	get(key) {
		let keys = key.split('.').reverse()
		return this.getParsed(keys)[keys.pop()]
	}

	set(key, value) {
		let keys = key.split('.').reverse()
		this.getParsed(keys)[keys.pop()] = value
	}

	write() {
		fs.writeFileSync(this.path, JSON.stringify(this.data))
	}
}

Preferences.defaults =  {
	video: {
		"screen-shake": true,
		"use-chevrons": false
	},
	audio: {
		"volume-master": 5,
		"volume-music": 5,
		"volume-sound": 5,
		"pitch-bend": true
	}
}

function parseDataFile(filePath, defaults) {
	try {
		let prefs = JSON.parse(fs.readFileSync(filePath))
		$.extend(true, defaults, prefs)
		return defaults
	} catch(error) {
		return defaults
	}
}

preload = {
	openExternal: function(url) {
		shell.openExternal(url)
	}
}
