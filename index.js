import { AocClient } from 'advent-of-code-client';
import { secrets } from './secrets.js';
import { stat, writeFile, readFile } from 'fs/promises';

// Settings
const settings = {
  year: 2024,
  day: 3,
  part: 1,
  sendAnswer: false
};

// here the main code is imported
import { parts } from './2024_3/solution.js';

// 
const client = new AocClient({
  year:  settings.year, 
  day:   settings.day, 
  token: secrets.cookie
});

const inputPath = `./${settings.year}_${settings.day}/input.txt`;

const fileExists = async path => !!(await stat(path).catch(e => false));

const proxyGetInput = async () => {
  let input = "";
  try {
    if (await fileExists(inputPath)) {
      // read input from file
      input = await readFile(inputPath, { encoding: 'utf8' });
    } else {
      //get input from web
      input = await client.getInput();
      await writeFile(inputPath, input);
    };
  } catch (error) {
    console.log('Error getting input:' + error.message);
  }
  return input;
}

async function main() { 
  // get input from file (or web the first time)
  const input = await proxyGetInput();
  let answer = "";
  
  // call my solution function
  if (settings.part === 1) {
    answer = parts.part1(input);
  } else if (settings.part === 2) {
    answer = parts.part2(input);
  }

  // show answer
  console.log(`Answer: "${ answer }"`);

  // send back answer
  if (settings.sendAnswer) {
    try {
      const success = await client.submit(settings.part, answer);        
      //if (success) {
      //  console.log(`Answer "${ answer }" was correct!`);
      //} else {
      //  console.log(`Answer "${ answer }" incorrect!`);
      //}
    } catch (error) {
      console.log(`Error submitting answer "${ answer }": ` + error.message);
    }  
  }

  // end here
  process.exit();

}

// call main program
await main();

