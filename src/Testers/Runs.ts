import _ from "lodash";
import BitTools from "../BitTools";
export type RunLengths = { [key: string]: number };

export default class Runs {
  public gatherData(testCase: ArrayBuffer): RunLengths {
    const uint = new Uint8Array(testCase);
    let runLengthResults: RunLengths = {};
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
   * distrobution.  The "first" run length is used as equal to 1.
   * 
   * @param input An array of data to calculate ratios for.
   */
  public testData(input: RunLengths): RunLengths {
    if (_.isEmpty(input)) {
      return {};
    }
    
    const output: RunLengths = {};
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

  private writeResult(resultsArray: RunLengths, runLength: number): RunLengths {
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
