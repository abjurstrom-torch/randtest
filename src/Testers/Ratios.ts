import BitTools from "../BitTools";

export default class Ratios {
    public test(testCase: ArrayBuffer): number {
        const uint = new Uint8Array(testCase);
        let skew = 0;
        uint.forEach((value) => {
            for(let bitIndex = 0; bitIndex < 8; bitIndex++) {
                if (BitTools.getBit(value, bitIndex) === 1) {
                    skew += 1;
                } else {
                    skew -= 1;
                }
            }
        });

        return skew;
    }
}