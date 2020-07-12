const nodePandoc = require('node-pandoc');

const out = "../out/raster"

function callback(err, result) {
	if (err) console.error('Oh Nos: ',err)
	return result
}

function cover() {
	let src = "../app/rec/layout/cover.svg"
	let args = "-f svg -t pdf"
	nodePandoc(src, args, callback)
}

cover()
