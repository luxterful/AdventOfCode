#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getAocData } from './utils/aocDataFetcher.js';
import { execute } from './utils/execute.js';

const ENVIRONMENTS = {
    "node": ".js",
    "ts-node": ".ts",
    "python": ".py",
    "cpp": ".cpp",
    "bash": ".sh"
}

const argv = yargs(hideBin(process.argv)).argv

const { year, day, env } = argv

if (typeof year !== "number") {
    console.error("ERROR: year not set properly. Should be type number")
    process.exit(1);
}

if (year < 2015) {
    console.log("ERROR: argument 'year' must be 2015 or later");
    process.exit(1);
}

if (typeof day !== "number") {
    console.error("ERROR: day not set properly. Should be type number")
    process.exit(1);
}

if (day < 1 || day > 25) {
    console.log("ERROR: argument 'day' not in range 1-25");
    process.exit(1);
}

const supporedEnvs = Object.keys(ENVIRONMENTS)
if (!supporedEnvs.includes(env)) {
    console.error(`ERROR: env not within supported list. Can be: ${supporedEnvs.join(", ")}`)
    process.exit(1);
}

const folder = `${year}/${day}`

const aocData = await getAocData(year, day)

execute(`${env} ${folder}/script${ENVIRONMENTS[env]} "${aocData}"`)