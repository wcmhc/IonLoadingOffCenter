module.exports = function(ctx) {
    // These are NPM include dependencies. Only include what is needed to run the app on the device
    // Will automatically use the .min.js file if it exists (must be same filename otherwise)
    var dependencies = [
        "@ionic/core/css/ionic.bundle.css",
        "@ionic/core/dist/**",
	"@babel/polyfill/dist/polyfill.js",
    ];




    // ################################################################################################################
    var glob = require("glob");
    var path = ctx.requireCordovaModule("path");
    var fse = require("fs-extra");
    var deferral = ctx.requireCordovaModule("q")
        .defer();

    var wwwJsRoot = path.join(ctx.opts.projectRoot, "www/vendor");
    var nmRoot = path.join(ctx.opts.projectRoot, "node_modules");

    var error = false;
    var stagedFiles = [];

    for (var i in dependencies) {
        if (!dependencies.hasOwnProperty(i)) {
            continue;
        }

        var pattern = path.join(nmRoot, dependencies[i]);
        var minFile = null;

        if ("*" === pattern.substr(pattern.length - 1)) {
            var tfiles = glob.sync(pattern, { nodir: true });

            if (tfiles.length < 1) {
                deferral.reject(new Error("\x1b[31m:NpmDependencyLinker::Dependency '" + pattern + "' not found. Exiting build.\x1b[0m"));
                error = true;
                break;
            } else {
                stagedFiles = stagedFiles.concat(tfiles);
            }
        } else {
            if ("css" === pattern.substr(pattern.length - 3)) {
                minFile = pattern.substr(0, pattern.length - 3) + "min.css";
            } else if ("js" === pattern.substr(pattern.length - 2)) {
                minFile = pattern.substr(0, pattern.length - 2) + "min.js";
            }

            if (fse.existsSync(minFile)) {
                stagedFiles.push(minFile);
            } else if (fse.existsSync(pattern)) {
                stagedFiles.push(pattern);
            } else {
                deferral.reject(new Error("\x1b[31m:NpmDependencyLinker::Dependency '" + pattern + "' not found. Exiting build.\x1b[0m"));
                error = true;
                break;
            }
        }
    }

    if (!error) {
        stagedFiles.forEach(function(file) {
            var fileNameBare = file.substr(ctx.opts.projectRoot.length + 14);
            var newPath = path.join(wwwJsRoot, fileNameBare);

            try {
                fse.mkdirpSync(path.dirname(newPath));
                fse.copyFileSync(file, newPath);
            } catch (e) {
                deferral.reject(new Error("\x1b[31m:NpmDependencyLinker::Error linking dependency due to: '" + e + "'. Exiting build.\x1b[0m"));
                return;
            }

            console.log(":NpmDependencyLinker::Linked '" + fileNameBare + "' to '" + newPath + "'");
        });
    }

    deferral.resolve();

    return deferral.promise;
};
