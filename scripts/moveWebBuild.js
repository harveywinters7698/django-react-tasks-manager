const fs = require("fs");
const ncp = require("ncp").ncp;

const projectFrontEndBasePath = "../project/frontend/static";
const frontEndBuildPath = "../frontend/build";

function removeStaticFolder() {
    if (fs.existsSync(projectFrontEndBasePath)) {
        fs.rmSync(projectFrontEndBasePath, { recursive: true });
        console.log(`✅ Removed ${projectFrontEndBasePath}`);
    }
}

function restructureIndexHtml() {

    function updateHtmlFile() {
        const source = `${projectFrontEndBasePath}/index.html`;
        const data = fs.readFileSync(source).toString();
        let result = data.replace('href="/manifest.json"', 'href="/static/manifest.json"');
        result = result.replace('href="/logo192.png"', 'href="/static/logo192.png"')
        result = result.replace('href="/favicon.ico"', 'href="/static/favicon.ico"')
        fs.writeFileSync(source, result);
        console.log(`✅ Updated ${source} static file paths`);
    }

    updateHtmlFile();
    const source = `${projectFrontEndBasePath}/index.html`;
    const destination = "../project/frontend/templates/index.html";

    fs.rename(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }

        console.log("✅ Restructured index.html");
        console.log("========================================================");
        console.log("✅ Finished moving web build folder");
        console.log("========================================================");
    });
}

function restructureJs() {
    const source = `${projectFrontEndBasePath}/static/js`;
    const destination = `${projectFrontEndBasePath}/js`;

    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        fs.rmSync(source, { recursive: true });
        console.log("✅ Restructured js files");
        restructureIndexHtml();
    });
}

function restructureCss() {
    const source = `${projectFrontEndBasePath}/static/css`;
    const destination = `${projectFrontEndBasePath}/css`;

    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        fs.rmSync(source, { recursive: true });
        console.log("✅ Restructured css files");
        restructureJs();
    });
}

function moveWebBuild() {
    ncp(frontEndBuildPath, projectFrontEndBasePath, function (err) {
        console.log(`✅ Copied files from ${frontEndBuildPath} to ${projectFrontEndBasePath}`);
        restructureCss();
    });
}

function main() {
    console.log("========================================================");
    console.log("Begin Moving Front End Files to Django Project");
    console.log("========================================================");
    removeStaticFolder();
    moveWebBuild();
}

main();
