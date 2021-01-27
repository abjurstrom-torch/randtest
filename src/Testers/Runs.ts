import BitTools from "../BitTools";
export type RunLengths = {[key: number]: number};

export default class Runs {
    public test(testCase: ArrayBuffer): RunLengths {
        const uint = new Uint8Array(testCase);
        let runLengthResults: RunLengths = {};
        let bitRunning: number | null = null;
        let runCounter = 0;

        uint.forEach((value) => {
            for(let bitIndex = 7; bitIndex >= 0; bitIndex -= 1) {
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