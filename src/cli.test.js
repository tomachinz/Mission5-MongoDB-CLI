import cli from "./cli.js";
import { expect, jest, test, describe } from '@jest/globals';

let ERROR_CODE = 1;

// Due to the CLI will call process.exit()
// We assign all properties of the "real process" to
// our "mock" process, otherwise, if "cli()" relied
// on any of such properties (i.e `process.env.NODE_ENV`)
// it would crash with an error like:
// `TypeError: Cannot read property 'NODE_ENV' of undefined`.
const realProcess = process;
const exitMock = jest.fn();
global.process = { ...realProcess, exit: exitMock };

const mockExit = jest.spyOn(process, 'exit') 
  .mockImplementation((number) => { 
    throw new Error('mockImplementation caught process.exit: ' + number); 
  });
const mockStdout = jest.spyOn(process.stdout, 'write')
  .mockImplementation((out) => {  // Capture terminal stdout
    console.log(`mockImplementation wrote ${out.length} to stdout`) 
    return out;  
  });





describe("The CLI tool with no arguments specified ", () => {
 
  test('should try to exit process', () => {
    cli();
    expect(exitMock).toHaveBeenCalledWith(ERROR_CODE);
  });


  test("Exit mock to throw error", () => {
    cli();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE).toThrow();
  });

  test("Exit mock to throw inside try catch", () => {
    try {
      cli();
    } catch (e) {
      console.log(e);
    }
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE).toThrow();
  });

  test("println mock test .", () => {
    const println = (string) => { process.stdout.write(string + '\n'); };
    println('Hello World');
    expect(mockStdout).toHaveBeenCalledWith('Hello World\n');
  });


  test("another test", () => {

    expect("Test of jest mockExit should try to exit", () => {
        cli();
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);

  })

  test("another test", () => {

    expect("Test of --help", () => {
      cli(' --help');    
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  })

  // global.process = realProcess;

});

// describe(" ", () => {
// }
  //   test("returns helpful guidance", () => {
//     expect(cli()).toEqual(`Usage: cli [options] [command]

// CLI for managing customers

// Options:
//   -V, --version                                 output the version number
//   -h, --help                                    display help for command

// Commands:
//   add|a <firstname> <lastname> <phone> <email>  Add a customer
//   find|f <firstname>                            Find a customer
//   help [command]                                display help for command
// `);
//   });