const fs = require("fs");

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

const main = () => {
  // We already know this
  const enPath = "./en/translation.json";
  const enData = fs.readFileSync(enPath, {
    encoding: "utf-8",
  });
  const targetKeys = Object.keys(JSON.parse(enData));

  const files = getFiles(".");

  files.forEach((file) => {
    if (file != enPath) {
        console.info(`Checking locale ${file}`)
      let not_included = [];
      try {
        const data = fs.readFileSync(file, {
          encoding: "utf-8",
        });
        const thisLang = JSON.parse(data);
        const thisLangKeys = Object.keys(thisLang);
        not_included = targetKeys.filter(
          (t_key) => !thisLangKeys.includes(t_key)
        );
      } catch (e) {
        console.error(`Unexpected Error: ${e}`);
      }
      if (not_included.length > 0) {
        throw new Error(`Missing keys for locale ${file}: \n - ${not_included.join(" \n - ")}\n\n`);
      }
    }
  });
};

main();
