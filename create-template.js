var fs = require('fs');
let gulpConfig = require('./gulpfile');
let componentName = process.argv[2];
let scssRegExp = new RegExp(`(${componentName})+(.scss|.pug|.js)`, 'g');
const componentPaths = {
    style: 'src/assets/styles/',
    script: 'src/assets/scripts/gulp-modules/',
    pug: 'src/pug/pages/',
};

function checkFileAviability(path, name) {
    return fs.readdir(path, function(err, files) {
        if (files.toString().match(scssRegExp)) {
            console.log(`${scssRegExp} is already created`);
            return false
        } else {
            console.log(`${scssRegExp} is not already created`);
            return true;
        }
    });

}
console.log(gulpConfig.getPathes());

if (componentName === undefined) {
    console.log('You didn`t enter component name');
    return false;
} else {
    if (checkFileAviability(componentPaths.style, componentName)) {
        console.log('STYLE YES');

    }
    // fs.readdir('src/assets/styles/', function(err, files) {
    //     console.log(files);
    //     if (scssRegExp.test(files.toString())) {
    //         console.log(`${componentName}.scss component already created`);
    //         return;
    //     } else {
    //         fs.appendFile('src/assets/styles/main.scss', `@import './${componentName}';`, function(err) {
    //             console.log(`${componentName} created`);
    //         });
    //         fs.writeFile(`src/assets/styles/${componentName}.scss`, '', function(err) {
    //             console.log(`style  ${componentName}.scss created`);
    //         });
    //     }
    // });
    // fs.readdir('src/assets/scripts/gulp-modules/', function(err, files) {
    //     // console.log(files);
    //     if (scssRegExp.test(files.toString())) {
    //         console.log(`${componentName}.js component already created`);
    //         return;
    //     } else {
    //         fs.writeFile(`src/assets/scripts/gulp-modules/${componentName}.js`, '', function(err) {
    //             console.log(`${componentName}.js created`);
    //         });

    //     }
    // });
    // fs.readdir('src/pug/pages/', function(err, files) {
    //     console.log(files);
    //     if (scssRegExp.test(files.toString())) {
    //         console.log(`${componentName}.pug component already created`);
    //         return;
    //     } else {
    //         fs.writeFile(`src/pug/pages/${componentName}.pug`, '', function(err) {
    //             console.log(`${componentName}.pug created`);
    //         });
    //     }
    // });



}