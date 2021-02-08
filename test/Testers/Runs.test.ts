import _ from "lodash";
import Runs, { RunLengths } from "../../src/Testers/Runs";
import { OneToOneHundred, RandomSample, RandomSampleMassive, RandomSampleRunLengths } from "../TargetNumbers";

test("gatherData, on an array of full ints, returns sum bits as only run length", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array([0b11111111, 0b11111111]);
  expect(objectUnderTest.gatherData(payload)).toEqual({ 16: 1 });
});

test("gatherData, on an array of chunky mixed binary, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array([0b11110000, 0b11001111]);
  expect(objectUnderTest.gatherData(payload)).toEqual({ 2: 2, 4: 3 });
});

test("gatherData, on an array of flipping binary, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array([0b01010101, 0b10101010]);
  expect(objectUnderTest.gatherData(payload)).toEqual({ 1: 14, 2: 1 });
});

test("gatherData, on an array of zeros, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array([0, 0, 0, 0]);
  expect(objectUnderTest.gatherData(payload)).toEqual({ 32: 1 });
});

test("gatherData, on a number set of 1 to 100, returns correct run lengths", () => {
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
  expect(objectUnderTest.gatherData(payload)).toEqual(expected);
});

test("gatherData, on a number set of random data, returns correct run lengths", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array(RandomSample);
  const expected = RandomSampleRunLengths;
  expect(objectUnderTest.gatherData(payload)).toEqual(expected);
});

test("testData, on a number set of random data, returns correct scores", () => {
  const objectUnderTest = new Runs();
  const expected: RunLengths = {
     "1": 1,
     "2": 0.4050632911392405,
     "3": 0.2489451476793249,
     "4": 0.07172995780590717,
     "5": 0.046413502109704644,
     "6": 0.02531645569620253,
     "7": 0.02109704641350211,
  };

  const testTarget = objectUnderTest.testData(RandomSampleRunLengths);
  
  expect(testTarget["1"]).toBeCloseTo(expected["1"]);
  expect(testTarget["2"]).toBeCloseTo(expected["2"]);
  expect(testTarget["3"]).toBeCloseTo(expected["3"]);
  expect(testTarget["4"]).toBeCloseTo(expected["4"]);
  expect(testTarget["5"]).toBeCloseTo(expected["5"]);
  expect(testTarget["6"]).toBeCloseTo(expected["6"]);
  expect(testTarget["7"]).toBeCloseTo(expected["7"]);

  expect(_.keys(testTarget)).toHaveLength(7);
});

test("testData, on a large set of random data, returns a score that closely fits with expected", () => {
  const objectUnderTest = new Runs();
  const payload = new Uint8Array(RandomSampleMassive);
  const runLengths = objectUnderTest.gatherData(payload);
  const runScores = objectUnderTest.testData(runLengths);
  const expectedScore = objectUnderTest.expectedFrequency(4);
  expect(Math.abs(runScores["4"]-expectedScore)).toBeLessThan(0.01);
});