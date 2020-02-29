const path = require('path');
const fs = require('fs');
const stat = fs.stat;
const root = process.cwd();
const pjson = require(path.join(root, 'package.json'));
const assetBundler = pjson.assetBundler;

module.exports = function() {
    if(assetBundler && assetBundler.bundles) {
        if(assetBundler.bundles.length > 0) {
            assetBundler.bundles.forEach(function(bundle, idx) {
                var outputFile = bundle.output;
                fs.writeFile(outputFile,"",function(err, result) {
                    if (err) throw err;
                });
                bundle.files.forEach(function(filepath, x) {
                    fs.readFile(bundle.basePath + filepath, (err, content) => {
                        if(err) throw err;
                        content += "\n";
                        fs.appendFile(outputFile, content, function(err, result) {
                            if(err) throw err;
                            console.log(filepath + ' wrote to ' + outputFile);
                        });
                    });
                });
            });
        }
    } else {
        console.log("assetBundler object not found in package.json, please refer to the readme for directions.");
    }
}