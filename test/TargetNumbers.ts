import seedrandom from "seedrandom";

export const OneToOneHundred: number[] = (() => {
  const output: number[] = [];

  for (let counter = 0; counter < 100; counter += 1) {
    output.push(counter + 1);
  }

  return output;
})();

export const RandomSample: number[] = (() => {
  const output: number[] = [];
  const randomGenerator = seedrandom("RandomSample Seed");
  for (let counter = 0; counter < 100; counter += 1) {
    output.push(getByte(randomGenerator));
  }

  return output;
})();

export const RandomSampleMassive: number[] = (() => {
  const output: number[] = [];
  const randomGenerator = seedrandom("RandomSample Seed");
  for (let counter = 0; counter < 10000; counter += 1) {
    output.push(getByte(randomGenerator));
  }

  return output;
})();

export const RandomSampleRunLengths = {
  "1": 237,
  "2": 96,
  "3": 59,
  "4": 17,
  "5": 11,
  "6": 6,
  "7": 5,
};

function getByte(randomGenerator: seedrandom.prng) {
  return Math.floor(randomGenerator() * 255);
}
