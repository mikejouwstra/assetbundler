var pjson = require('./package.json');
var fs = require('fs');

var stat = fs.stat;
var assetBundler = pjson.assetBundler;

exports.bundleAssets = function() {
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
                        });
                    });
                });
            });
        }
    }
}

//exports.bundleAssets();