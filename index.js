const path = require('path');
const fs = require('fs');
const stat = fs.stat;
const root = process.cwd();
const pjson = require(path.join(root, 'package.json'));

module.exports = function() {
    if(pjson.assetBundler && pjson.assetBundler.bundles) {
        if(pjson.assetBundler.bundles.length > 0) {
            pjson.assetBundler.bundles.forEach(function(bundle, idx) {
                var outputFile = bundle.output;
                fs.writeFile(outputFile,"",function(err, result) {
                    if (err) throw err;
                });

                compileContent(bundle.basePath, bundle.files, 0, outputFile);

                /*for(var i = 0; i < bundle.files.length; i++) {
                    filepath = bundle.files[i];

                    fs.readFile(bundle.basePath + filepath, (err, content) => {
                        if(err) throw err;
                        content += "\n";
                        fs.appendFile(outputFile, content, function(err, result) {
                            if(err) throw err;
                            console.log(filepath + ' wrote to ' + outputFile);
                        });
                    });
                }*/
            });
        }
    } else {
        console.log("assetBundler object not found in package.json, please refer to the readme for directions.");
    }
}

function compileContent(basepath, files, idx, outputFile) {
    if(files[idx]) {
        fs.readFile(basepath + files[idx], (err, content) => {
            if(err) throw err;
            content += "\n";
            fs.appendFile(outputFile, content, function(err, result) {
                if(err) throw err;
                console.log(files[idx] + ' wrote to ' + outputFile);

                idx++;
                compileContent(basepath, files, idx, outputFile);
            });
        });
    }
}
