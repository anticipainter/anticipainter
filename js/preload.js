const fs = require("fs")
const path = require("path")
const shell = require("electron").shell
const userDataPath = require("electron").remote.app.getPath("userData");

Preferences = class {
	constructor(opts) {
		this.path = path.join(userDataPath, opts.configName + ".json")
		this.data = parseDataFile(this.path, opts.defaults)
	}

	get(key) {
		return this.data[key]
	}

	set(key, value) {
		this.data[key] = value
		fs.writeFileSync(this.path, JSON.stringify(this.data))
	}
}

function parseDataFile(filePath, defaults) {
	try {
		return JSON.parse(fs.readFileSync(filePath))
	} catch(error) {
		return defaults
	}
}

preload = {
	openExternal: function(url) {
		shell.openExternal(url)
	}
}
