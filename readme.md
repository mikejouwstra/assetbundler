#assetbundler
---
easy to use bundler of asset files.

Define the order files are built within the vendorPaths config object.

Define the file to combine your files into with assetBundler.output property.

This is a sample snippet to add to your package.json file:

```
"assetBundler": {
    "vendorPaths": { 
        "angular": "angular.min.js",
        "@uirouter/angularjs": "release/angular-ui-router.min.js",
        "angular-material": "angular-material.min.js"
    },
    "output": "./public/js/vendor.js"
}
```