const { log } = console;
const statisticMethods = {
  mean: (numbers) => {
    // console.log("MEAN");

    let addedNumbers = 0;

    for (let i = 0; i < numbers.length; i++) {
      const currentNum = numbers[i];
      addedNumbers = addedNumbers + currentNum;
    }

    const mean = (addedNumbers / numbers.length).toFixed(2);
    return mean;
  },
  mode: (numbers) => {
    // console.log("MODE");
    const obj = {};

    for (let i = 0; i < numbers.length; i++) {
      let currentNum = numbers[i];
      if (!obj[currentNum]) {
        obj[currentNum] = 1;
      } else {
        obj[currentNum] += 1;
      }
    }
    // log(obj);

    // get key with the highest value
    let allModes = [];
    let highestValue = 0;
    // let highestValueKey = -Infinity;

    for (const key in obj) {
      const value = obj[key];
      if (value > highestValue) {
        highestValue = value;
        // highestValueKey = key;
      }
    }

    //   get all values with the same number of occurrences
    for (const key in obj) {
      const value = obj[key];

      if (value === highestValue) {
        allModes.push(Number(key));
      }
    }

    return allModes;
  },
  median: (numbers) => {
    // log("MEDIAN");
    //  log(numbers);

    // order array
    const orderedArr = numbers.sort((a, b) => a - b);
    // log(orderedArr);

    let medianNum = 0;

    if (numbers.length === 1) {
      medianNum = numbers[0];
      return medianNum;
    }

    //  check if array is odd
    if (numbers.length % 2 !== 0) {
      // if arry is odd then return the median
      const middleIndex = (numbers.length - 1) / 2;
      medianNum = orderedArr[middleIndex];
    } else {
      // the array is even
      const maxIndex = numbers.length / 2;
      const middleNumbers = [orderedArr[maxIndex - 1], orderedArr[maxIndex]];
      medianNum = statisticMethods.mean(middleNumbers);
    }

    return medianNum;
  },
};

module.exports = statisticMethods;
