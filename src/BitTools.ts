export default class BitTools {
    public static getBit(binary: number, bitIndex: number): number {
        const bitMask = 1 << bitIndex;
        const result = binary & bitMask;
        return result >>> bitIndex;
    }

    public static setBit(binary: number, bitIndex: number): number {
        const bitMask = 1 << bitIndex;
        return binary | bitMask;
    }

    public static clearBit(binary: number, bitIndex: number): number {
        const bitMask = ~(1 << bitIndex);
        return binary & bitMask;
    }
}