/*
 * This simply download the latest version of Google Closure Compiller (*.jar)
 * and store detected java path into temporary file.
 */
 

	
console.log(
	"\n\n" + 
	'GradientOverlay.JS - custom javascripts builder' + "\n" + 
	'==============================================='
);

const fs = require('fs');
const path = require('path');
const download = require('download');
const targetDirRel = 'dev-tools/bin/compiler';

download(
	'http://dl.google.com/closure-compiler/compiler-latest.zip', 
	'dev-tools/bin/compiler',
	{extract: true}
).then((emptyObj, require, module, file, dir) => {
	var compillerDirFullPath = __dirname + path.sep + targetDirRel;
	var dirItems = fs.readdirSync(compillerDirFullPath, {});
	var dirItemExt = '';
	var dirItemFullPath = '';
	
	// let on filesystem from extracted google closure compiller zip file only JAR application
	for (var i = 0, l = dirItems.length; i < l; i += 1) {
		dirItemFullPath = compillerDirFullPath + path.sep + dirItems[i];
		dirItemExt = path.extname(dirItems[i]).toLowerCase();
		if (dirItemExt == '.jar') {
			var renameResult = fs.renameSync(dirItemFullPath, compillerDirFullPath + path.sep + 'compiler.jar');
		} else {
			try {
				fs.unlinkSync(dirItemFullPath);
			} catch (e) {}
		}
	}
	
	console.log(
		"\n\n" + 'Google Closure Compiler successfully downloaded and installed in:' + "\n" + 
		"\t" + '"' + __dirname + '/dev-tools/bin/compiler/compiler.jar' + "\n"
	);

});