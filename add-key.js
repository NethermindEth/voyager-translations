const fs = require("fs")

const ignoreFiles = [
  ".github",
  ".git",
  "Contribution.md",
  "LICENSE",
  "main.js",
  "add-key.js",
  "README.md",
]

function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)

  const filteredFileList = fileList.filter(file => !ignoreFiles.includes(file))

  for (const file of filteredFileList) {
    const name = `${dir}/${file}`

    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files)
    } else {
      files.push(name)
    }
  }
  return files
}

function add_key() {
  const args = process.argv.slice(2)

  if (args.length % 2 !== 0) {
    throw new Error("Even number or args required. Key+Value like")
  }

  const pairs = []
  for (let i = 0; i < args.length; i += 2) {
    if (i + 1 < args.length) {
      pairs.push([args[i], args[i + 1]])
    } else {
      pairs.push([args[i]])
    }
  }

  console.log("Command-line argument pairs:")
  console.log(pairs)

  const files = getFiles(".")

  pairs.forEach(pair => {
    const [new_key, new_value] = pair

    files.forEach(file => {
      try {
        const data = fs.readFileSync(file, {
          encoding: "utf-8",
        })
        const thisLang = JSON.parse(data)
        const thisLangKeys = Object.keys(thisLang)
        if (!thisLangKeys.includes(new_key)) {
          console.info(`Wiriting locale ${file} | Adding ${new_key} ":" ${new_value}`)
          // If this lang doesn't contain this key then only update
          const newFileData = {
            ...thisLang,
            [new_key]: new_value,
          }
          fs.writeFileSync(file, JSON.stringify(newFileData, null, 2))
        } else {
          console.warn(`locale ${file} already has ${new_key}. Skipping`)
        }
      } catch (e) {
        console.error(`Unexpected Error: ${e}`)
      }
    })
  })
}

add_key()
