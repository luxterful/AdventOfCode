#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getAocData } from './utils/aocDataFetcher.js';
import { execute } from './utils/execute.js';
import fs from "fs"

const ENVIRONMENTS = {
    "node": ".js",
    "ts-node": ".ts",
    "python3": ".py",
    "cpp": ".cpp",
    "bash": ".sh",
    "php": ".php",
    "go": ".go"
}

const argv = yargs(hideBin(process.argv)).argv

const { year, day, env } = argv

if (typeof year !== "number") {
    console.error("ERROR: year not set properly. Should be type number")
    process.exit(1);
}

if (year < 2015) {
    console.error("ERROR: argument 'year' must be 2015 or later");
    process.exit(1);
}

if (typeof day !== "number") {
    console.error("ERROR: day not set properly. Should be type number")
    process.exit(1);
}

if (day < 1 || day > 25) {
    console.error("ERROR: argument 'day' not in range 1-25");
    process.exit(1);
}

const supporedEnvs = Object.keys(ENVIRONMENTS)
if (!supporedEnvs.includes(env)) {
    console.error(`ERROR: env not within supported list. Can be: ${supporedEnvs.join(", ")}`)
    process.exit(1);
}

const script = `${year}/${day}/script${ENVIRONMENTS[env]}`

const scriptExists = fs.existsSync(script)

if(!scriptExists) {
    console.error(`ERROR: script "${script}" does not exist`);
    process.exit(1);
}

const aocData = await getAocData(year, day)
if(env === "go") {
    execute(`go run ${script}`, aocData)
} else {
    execute(`${env} ${script}`, aocData)
}
