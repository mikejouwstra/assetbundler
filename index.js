var pjson = require('./package.json');
var fs = require('fs');
if(pjson.assetBundler && pjson.assetBundler.vendorPaths) {
    var vendorPathLen = Object.keys(pjson.assetBundler.vendorPaths).length;
    if(vendorPathLen > 0) {
        var outputFile = pjson.assetBundler.output;
        fs.writeFile(outputFile,"",function(err, result) {
            if (err) throw err;
        });
        Object.keys(pjson.dependencies).forEach(key => {
            let value = pjson.dependencies[key];
            var data = {key:key, val:value, path:"./node_modules/" + key};
            fs.stat(data.path, function(err, stats) {
                data.isDirectory = stats.isDirectory();
                if(data.isDirectory && pjson.assetBundler.vendorPaths[key] !== undefined) {
                    data.file = pjson.assetBundler.vendorPaths[key];
                    var vendorPath = data.path + "/" + data.file;
                    fs.readFile(vendorPath, (err, content) => {
                        if (err) throw err;
                        fs.appendFile(outputFile, content, function(err, result) {
                            if (err) throw err;
                            console.log(key + " written to " + outputFile);
                        });
                    });
                }
            });
        });
    }
}