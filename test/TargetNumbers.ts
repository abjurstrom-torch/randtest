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

function getByte(randomGenerator: seedrandom.prng) {
  return Math.floor(randomGenerator() * 255);
}
