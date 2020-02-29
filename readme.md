# asset bundler
---
easy to use bundler of asset files.

Set the shared path of your files in bundle.basePath.

Define the order of builds within the bundle.files array.

Define the path to combine your files into with the bundle.output property.

This is a sample snippet which belongs in your package.json file:

```
"assetBundler": {
    "bundles": [
        {
            "basePath": "./node_modules/",
            "files": [
                "angular/angular.min.js",
                "@uirouter/angularjs/release/angular-ui-router.min.js",
                "angular-material/angular-material.min.js"
            ], 
            "output": "./public/js/vendor.js"
        },{
            "basePath": "./assets/js/",
            "files": [
                "app.js",
                "controllers/MainController.js",
                "services/API.js"
            ], 
            "output": "./public/js/scripts.js"
        },{
            "basePath": "./assets/css/",
            "files": [
                "style.css"
            ], 
            "output": "./public/css/style.css"
        }
    ]
}
```