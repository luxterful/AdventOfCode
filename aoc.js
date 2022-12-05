#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getAocData } from './utils/aocDataFetcher.js';

const argv = yargs(hideBin(process.argv)).argv

console.log(argv)

const { year, day } = argv

const aocData = await getAocData(year, day)
