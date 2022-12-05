import readline from "readline-sync"
import fs from "fs"

const CONFIG_FILE = ".aocdownloader.conf";

export function getSessionID() {
    const configFileExists = fs.existsSync(CONFIG_FILE)

    if (configFileExists) {
        const configFileContentRaw = fs.readFileSync(CONFIG_FILE, "utf8")
        const configFileContent = JSON.parse(configFileContentRaw)

        const { sessionCookie } = configFileContent

        return sessionCookie
    }

    const sessionCookie = readline.question("Please input session cookie: ");
    const configFileContentRaw = JSON.stringify({ sessionCookie })
    fs.writeFileSync(CONFIG_FILE, configFileContentRaw, "utf-8");
    return sessionCookie
}