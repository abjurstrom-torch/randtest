import Ratios from "../../src/Testers/Ratios";

test("Ratios test, on an array of full ints, returns sum bits as skew", () => {
  const objectUnderTest = new Ratios();
  const payload = new Uint8Array([0b11111111, 0b11111111]);
  expect(objectUnderTest.test(payload)).toEqual(16);
});

test("Ratios test, on an array of empty ints, returns negitive sum bits as skew", () => {
  const objectUnderTest = new Ratios();
  const payload = new Uint8Array([0b0, 0b0]);
  expect(objectUnderTest.test(payload)).toEqual(-16);
});

test("Ratios test, on an array of mixed bits, returns accurate skew", () => {
  const objectUnderTest = new Ratios();
  const payload = new Uint8Array([0b00110011, 0b10101010]);
  expect(objectUnderTest.test(payload)).toEqual(0);
});
