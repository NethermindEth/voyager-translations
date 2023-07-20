const fs = require("fs")

const ignoreFiles = [
    ".github",
    ".git",
    "Contribution.md",
    "LICENSE",
    "main.js",
    "add-key.js",
    "README.md",
];

function getFiles(dir, files = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir);

    const filteredFileList = fileList.filter(
        (file) => !ignoreFiles.includes(file)
    );

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

function add_key() {
    const args = process.argv.slice(2);

    const [new_key, new_value] = args;
    console.log("Adding Pair: ", new_key, ":", new_value)

    // We already know this
    const enPath = "./en/translation.json";
    const enData = fs.readFileSync(enPath, {
        encoding: "utf-8",
    });
    const targetKeys = Object.keys(JSON.parse(enData));

    if (targetKeys.includes(new_key)) {
        throw new Error(`Key Already Exists. Check ${enPath}. Aborting`);
    }

    const files = getFiles(".");

    files.forEach((file) => {
        console.info(`Wiriting locale ${file} | Adding ${new_key} ":" ${new_value}`)
        try {
            const data = fs.readFileSync(file, {
                encoding: "utf-8",
            });
            const thisLang = JSON.parse(data);
            const thisLangKeys = Object.keys(thisLang);
            if (!thisLangKeys.includes(new_key)) {
                // If this lang doesn't contain this key then only update
                const newFileData = {
                    ...thisLang,
                    [new_key]: new_value
                };
                fs.writeFileSync(file, JSON.stringify(newFileData, null, 2))
            }
        } catch (e) {
            console.error(`Unexpected Error: ${e}`);
        }
    });

}

add_key()