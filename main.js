const fs = require("fs")

const ignoreFiles = [".github", ".git", "Contribution.md", "LICENSE", "main.js", "README.md"]

function getFiles(dir, files = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir);

    const filteredFileList = fileList.filter(file => !ignoreFiles.includes(file))

    for (const file of filteredFileList) {

        const name = `${dir}/${file}`;

        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else {
            files.push(name);
        }
    }
    return files;
}

const main = () => {
    // We already know this
    const enPath = "./en/translation.json";
    const enData = fs.readFileSync(enPath, {
        encoding: "utf-8"
    });
    const targetKeys = Object.keys(JSON.parse(enData));

    const files = getFiles(".");    

    files.forEach((file) => {
        if (file != enPath) {
            try {
                const data = fs.readFileSync(file, {
                    encoding: "utf-8"
                });
                const thisLang = JSON.parse(data);
                const thisLangKeys = Object.keys(thisLang);
                let not_included = targetKeys.filter((t_key) => !thisLangKeys.includes(t_key));
                console.warn(file)
                console.warn("This Locales doesn't have following Keys:")
                console.warn(not_included)
            } catch (e) {
                console.error(e);
            }
        }
    })
}

main()