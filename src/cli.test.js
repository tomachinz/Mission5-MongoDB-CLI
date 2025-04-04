import cli from "./cli.js";
import { expect, jest, test, describe } from '@jest/globals';

let ERROR_CODE, realProcess, mockExit, mockStdout, mockProcessExit;

function beforeTestSetup() {
  ERROR_CODE = 1;
  // Due to the CLI will call process.exit()
  // We assign all properties of the "real process" to
  // our "mock" process, otherwise, if "cli()" relied
  // on any of such properties (i.e `process.env.NODE_ENV`)
  // it would crash with an error like:
  // `TypeError: Cannot read property 'NODE_ENV' of undefined`.
  realProcess = process;
  const exitMock = jest.fn();
  global.process = { ...realProcess, exit: exitMock };

  mockExit = jest.spyOn(process, 'exit') 
    .mockImplementation((number) => { 
      throw new Error('mockImplementation caught process.exit: ' + number); 
    });
  mockStdout = jest.spyOn(process.stdout, 'write')
    .mockImplementation((out) => {  // Capture terminal stdout
      // console.log(`mockImplementation wrote ${out.length} to stdout`) 
      return out;  
    });

  mockProcessExit = jest.spyOn(process, 'exit').mockImplementation(((code) => { 
    throw new Error(`mockImplementation process.exit(${code})`); // Forces the code to throw instead of exit
  }));

  beforeEach(() => { mockProcessExit.mockClear(); });
}

function afterTestCleanup() {
  mockExit.mockRestore();
  mockStdout.mockRestore();
  mockProcessExit.mockRestore();
  // global.process = realProcess;
  global.process = { ...realProcess };
  // setTimeout(() => {
  //   process.exit(0);
  // }, 2600);
}


describe("The CLI tool with no arguments specified ", () => {
  beforeTestSetup();
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

  test("println mock test of output to stdout", () => {
    const println = (string) => { process.stdout.write(string); }
    println('Hello World');
    expect(mockStdout).toHaveBeenCalledWith('Hello World');
  });


  test("another test", () => {
    expect(() => {
        cli();
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  })

  test("another test", () => {
    expect(() => {
      cli(' --help');    
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  })

});

describe("The CLI tool WITH PARAMETERS ", () => {
  beforeTestSetup();

  test("Test of add", () => {
    expect(() => {
      cli(' add');    
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  })

  test("Test 12 times 11", () => {
    expect(12 * 11).toEqual(132);
  })

  afterTestCleanup();
})


   