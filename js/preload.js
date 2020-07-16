const shell = require("electron").shell

preload = {
	openExternal: function(url) {
		shell.openExternal(url)
	}
}
