import Runs from "../src/Testers/Runs";
import { OneToOneHundred, RandomSample } from "./TargetNumbers";

test("Runs test, on an array of full ints, returns sum bits as only run length", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array([0b11111111, 0b11111111]);
  expect(objectUnderTest.test(payload)).toEqual({16: 1});
});

test("Runs test, on an array of chunky mixed binary, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array([0b11110000, 0b11001111]);
  expect(objectUnderTest.test(payload)).toEqual({2: 2, 4: 3});
});

test("Runs test, on an array of flipping binary, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array([0b01010101, 0b10101010]);
  expect(objectUnderTest.test(payload)).toEqual({1: 14, 2: 1});
});

test("Runs test, on an array of zeros, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array([0, 0, 0, 0]);
  expect(objectUnderTest.test(payload)).toEqual({32: 1});
});

test.only("Runs test, on a number set of 1 to 100, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array(OneToOneHundred);
  const expected = {
       "1": 206,
       "2": 97,
       "3": 48,
       "4": 25,
       "5": 13,
       "6": 7,
       "7": 7,
      };
  expect(objectUnderTest.test(payload)).toEqual(expected);
});

test("Runs test, on a number set of random data, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array(RandomSample);
  const expected = {
       "1": 206,
       "2": 97,
       "3": 48,
       "4": 25,
       "5": 13,
       "6": 7,
       "7": 7,
      };
  expect(objectUnderTest.test(payload)).toEqual(expected);
});