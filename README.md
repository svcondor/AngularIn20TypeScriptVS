# AngularIn20TypeScriptVS
Simple AngularJS Application with TypeScript, you can view video about typescript and angular in 20 minutes at ngconf2015 on [youtube](https://www.youtube.com/watch?list=PLOETEcp3DkCoNnlhE-7fovYvqwVPrRiY7&feature=player_embedded&v=U7NYTKgkZgo)

This is a clone of  [DanWahlin/AngularIn20TypeScript](https://github.com/DanWahlin/AngularIn20TypeScript) it has been modified to run under Visual Studio.
projrct.jdon
# Usage

Use the Comunity Version of Visual Studio 2015 RC or any other VS version.   Download and unzip the ZIP file and open **AngularIn20TypeScriptVS.sln**.   If you've installed the GitHub extension for Visual Studio then you can click "Open in Visual Studio" or you can Clone the repository.

<br />
**In Solution Explorer:**
* Expand the Dependencies virtual folder.

* Right click on NPM and Restore Packages.

* Right click on Bower and select Restore Packages. (The Bower packages might indicate '-not installed' but you should have a folder under wwwroot called bower_packages containing angular and the rest).

**In View/Other windows / task Runner explorer**
* Click refresh to list all of the gulpfile.js tasks
* Double click **tsd** to download .d.ts type definition files for angular and jquery.
* Double click **gen-ts-refs** to add reference paths for all the .ts files.
* Double click **compile-ts** to compile the .ts files into .js and .js.map files. Selecting **build** will also recompile the .ts files.  

**Click IIS Express to run the project.**

Set breakpoints in the TypeScript files.
<br /><br />
### Changes to the original project
* **src** folder was renamed to **wwwroot**
* **.js** and **.map** files are stored in the same folder as the **.ts** files
* **NPM** and **Bower** packages were updated to current versions
* **tsproject** is used to compile the .ts files using **tconfig.json** and uses the **1.5.0-beta** version of the tsc compiler.
* **gulp-tsd** is used to load .d.ts files from the **tsc-1.5.0-alpha** branch of [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped)

### Issues

* The .git folder shows in Solution Explorer

* NPM creates a folder in the project called node_modules.   Because of very long path names Windows Explorer will might refuse to delete this folder. One of the following should work at the cmd prompt.
  ``` 
    npm install -g rimraf
    rimraf node_modules

    rmdir /S /Q node_modules
```

