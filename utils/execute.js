import { exec } from 'node:child_process';

export function execute(command, input) {
  return exec(command, { env: { ...process.env, AOC_INPUT: input } }, (error, stdout, stderr) => {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
  });
}
