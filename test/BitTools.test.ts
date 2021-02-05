import BitTools from "../src/BitTools";

test("getBit, on test data, returns correct bit.", () => {
  expect(BitTools.getBit(0b1, 0)).toEqual(1);
  expect(BitTools.getBit(0b10, 0)).toEqual(0);

  expect(BitTools.getBit(0b1001, 3)).toEqual(1);
  expect(BitTools.getBit(0b0110, 3)).toEqual(0);
});

test("setBit, on test data, sets the correct bit.", () => {
  expect(BitTools.setBit(0b1000, 0)).toEqual(9);
  expect(BitTools.setBit(0b1001, 0)).toEqual(9);

  expect(BitTools.setBit(0b1001, 3)).toEqual(9);
  expect(BitTools.setBit(0b0110, 3)).toEqual(14);
});

test("clearBit, on test data, clears the correct bit.", () => {
  expect(BitTools.clearBit(0b1000, 0)).toEqual(8);
  expect(BitTools.clearBit(0b1001, 0)).toEqual(8);

  expect(BitTools.clearBit(0b1001, 3)).toEqual(1);
  expect(BitTools.clearBit(0b0110, 3)).toEqual(6);
});