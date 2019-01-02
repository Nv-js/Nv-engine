
const init = require('./config/init.rollup.config');
const rollup = require('rollup');
const colors = require('colors');
const fs = require('fs');
const path = require('path');


const inputOptions = init.config

const outputOptions = init.output



//
let cwd = process.cwd(),
    _path = path.join(cwd,'dist');

function removeDir(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
        });
        fs.rmdirSync(path);
    }
        build();
}
//
removeDir(_path)

async function build() {
    //watcher status
    if(!init.isProd){
        const watcher = rollup.watch(init.watch);
        watcher.on('event', event => {
            switch (event.code){
                case 'END':
                console.log(colors.green("Bundle file successful to " + outputOptions.file))
                break;
                case 'FATAL':
                console.log(colors.red("Bundle file failed , check the error"))
            } 
          });
    }
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);
    // generate code and a sourcemap
    const { code, map } = await bundle.generate(outputOptions);
    // or write the bundle to disk
    await bundle.write(outputOptions);
    init.isProd ? console.log(colors.green("Bundle file successful to " + outputOptions.file)) : ''
  }



