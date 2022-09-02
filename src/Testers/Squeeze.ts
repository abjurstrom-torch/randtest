import _ from "lodash";

export default class Squeeze {
    private readonly minimumDiffToReport: number;

    private currentValue: number;
    private counter: number;

    private complete: boolean;

    public constructor() {
      this.minimumDiffToReport = 0.001;
      this.currentValue = Math.pow(2, 31);
      this.counter = 0;
      this.complete = false;
    }
    /**
     * Each iteration of a test case needs 24 bits of data.
     * See https://lemire.me/blog/2017/02/28/how-many-floating-point-numbers-are-in-the-interval-01/
     * @param testCase 
     * @returns testCase minus first 3 bytes.
     */
    public tick(testCase: ArrayBuffer): ArrayBuffer {
        const uint = new Uint8Array(testCase);
        const wordsInt = _.sum(_.take(uint, 3));
        const wordsFloat = wordsInt / Math.pow(2, 24);
        
        this.currentValue = this.currentValue * wordsFloat;
        this.counter += 1;

        if (this.currentValue <= 1) {
          this.complete = true;
        }

        return new Uint8Array(_.drop(uint, 3)).buffer;
    }
}