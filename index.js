var pjson = require('./package.json');
var fs = require('fs');
if(pjson.vendorBundler && pjson.vendorBundler.vendorPaths) {
    var vendorPathLen = Object.keys(pjson.vendorBundler.vendorPaths).length;
    if(vendorPathLen > 0) {
        var outputFile = pjson.vendorBundler.output;
        fs.writeFile(outputFile,"",function(err, result) {
            if (err) throw err;
        });
        Object.keys(pjson.dependencies).forEach(key => {
            let value = pjson.dependencies[key];
            var data = {key:key, val:value, path:"./node_modules/" + key};
            fs.stat(data.path, function(err, stats) {
                data.isDirectory = stats.isDirectory();
                if(data.isDirectory && pjson.vendorBundler.vendorPaths[key] !== undefined) {
                    data.file = pjson.vendorBundler.vendorPaths[key];
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