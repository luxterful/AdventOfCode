import axios from "axios";
import fs from "fs"
import { getSessionID } from "./session.js";

const CACHE_DIR = "./.input_cache";

export async function getAocData(year, day) {
    const sessionID = getSessionID()

    const cacheDirExists = fs.existsSync(`${CACHE_DIR}/${year}`)
    if (!cacheDirExists) {
        fs.mkdirSync(`${CACHE_DIR}/${year}`);
    }

    const filePath = `${CACHE_DIR}/${year}/${day}`;

    const cacheExists = fs.existsSync(filePath)

    if (cacheExists) {
        const data = fs.readFileSync(filePath, "utf8");
        return data
    }

    const url = `https://adventofcode.com/${year}/day/${day}/input`;

    const { data } = await axios.get(url, {
        headers: {
            Cookie: `session=${sessionID};`
        }
    })

    fs.writeFileSync(filePath, data);

    return data
}