import _ from "lodash";
import BitTools from "../BitTools";
export type MappedNumbers = { [key: string]: number };

export default class Runs {
  private readonly minimumDiffToReport: number;

  public constructor() {
    this.minimumDiffToReport = 0.001;
  }
  
  /**
   * Counts the number of a bit that is the same are reports on the frequency of that run length.
   * Combines runs of 0s and 1s as long as they are the same length, thus, 0b00110011 would return {"2": 4}.
   * 
   * @param testCase The arrayBuffer to act on, should be an array of bits to check for runs on.
   */
  public findRunLengths(testCase: ArrayBuffer): MappedNumbers {
    const uint = new Uint8Array(testCase);
    let runLengthResults: MappedNumbers = {};
    let bitRunning: number | null = null;
    let runCounter = 0;

    uint.forEach((value) => {
      for (let bitIndex = 7; bitIndex >= 0; bitIndex -= 1) {
        const bit = BitTools.getBit(value, bitIndex);

        if (bit !== bitRunning) {
          runLengthResults = this.writeResult(runLengthResults, runCounter);
          bitRunning = bit;
          runCounter = 1;
        } else {
          runCounter += 1;
        }
      }
    });

    if (runCounter > 0) {
      runLengthResults = this.writeResult(runLengthResults, runCounter);
    }

    return runLengthResults;
  }

  /**
   * Creates an array of ratios for a given data set that can be used to find how far off an output of runs is from the idealized
   * distribution.  The "first" run length is used as equal to 1.
   * 
   * @param input An array of data to calculate ratios for.
   */
  public lengthsToRatios(input: MappedNumbers): MappedNumbers {
    if (_.isEmpty(input)) {
      return {};
    }
    
    const output: MappedNumbers = {};
    const root = _.first(_.toArray(input));
    _.forEach(input, (value, key) => {
      if (value === root) {
        output[key] = 1;
        return;
      }
      
      if (value === 0 || root === 0 || root === undefined) {
        output[key] = 0;
        return;
      }

      output[key] = value / root;
    });

    return output;
  }

  /**
   * Generates a expected frequency for a length of a run by a constant formula.
   * Can be compared to test data.
   * 
   * @param runLength The length of the run to calculate the approximate frequency for.
   */
  public expectedFrequency(runLength: number): number {
    const expectedFormula = {
      base: 2.1475,
      exp: -0.717
    }

    const power = runLength * expectedFormula.exp;
    return expectedFormula.base * Math.exp(power);
  }

  public scoreRatios(inputRatios: MappedNumbers): MappedNumbers {
    const output: MappedNumbers = {};

    _.forEach(inputRatios, (ratio, key) => {
      const score = Math.abs(this.expectedFrequency(Number.parseInt(key, 10))-ratio);
      if (score < this.minimumDiffToReport) {
        output[key] = 0;
      } else {
        output[key] = score;
      }
    });
    
    return output;
  }

  /**
   * Increments the correct length by the passed in run length and returns the resulting array.
   * 
   * @param resultsArray Array of all results
   * @param runLength the length of the current run to add to the results array
   * @returns the updated array of all results
   */
  private writeResult(resultsArray: MappedNumbers, runLength: number): MappedNumbers {
    if (runLength === 0) {
      return resultsArray;
    }

    if (resultsArray[runLength] === undefined) {
      resultsArray[runLength] = 1;
    } else {
      resultsArray[runLength] += 1;
    }

    return resultsArray;
  }
}

