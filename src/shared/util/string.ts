/**
 * Calculates the sum of numbers in a string.
 *
 * @param numbers - The string containing numbers to be summed.
 * @returns The sum of the numbers in the string.
 * @throws {Error} If the string contains negative numbers.
 */
export const add = (numbers: string): number => {
  // handle empty, null and undefined string
  if (numbers === "" || numbers == null) return 0;

  try {
    // fetch numbers from the string
    const numbersArray = fetchNumbers(numbers);

    // check if the string has negative numbers
    const negativeNumbers = numbersArray.filter((a) => a < 0);

    // if the string has negative numbers then throw an error
    if (negativeNumbers.length > 0) {
      throw new Error(
        `negative numbers not allowed ${negativeNumbers.join(",")}`
      );
    }

    // sum all the numbers in the string
    const answer = numbersArray.reduce((partialSum, a) => {
      return partialSum + a;
    }, 0);

    return answer;
  } catch (error) {
    // handle unknown error
    let message = "Unknown Error";

    // check if the error is an instance of Error
    if (error instanceof Error) message = error.message;

    throw new Error(message);
  }
};

/**
 * Fetches numbers from a string and returns an array of numbers.
 *
 * @param numbers - The string containing numbers.
 * @returns An array of numbers extracted from the string.
 */
export const fetchNumbers = (numbers: string): number[] => {
  // handle empty, null and undefined string
  if (numbers === "" || numbers == null) return [];

  const defaultDelimeter = ",";
  let delimeter = defaultDelimeter;

  try {
    // need to check if the string starts with `//[delimeter]` and has a delimeter
    if (numbers.startsWith("//[")) {
      // find the end of the delimiter
      const delimiterEndIndex = numbers.indexOf("]\n");
      // get the delimiter
      delimeter = numbers.substring(3, delimiterEndIndex);
      // remove the delimiter from the string
      numbers = numbers.slice(delimiterEndIndex + 2);
    }

    //handle just the custom delimeter
    if (!numbers) return [];

    // if the string has a new line character then replace it with the delimeter
    if (numbers.includes("\n")) {
      numbers = numbers.replace("\n", delimeter);
    }

    // splitting the string with the delimeter
    const numbersArray = numbers.split(delimeter);

    // sum all the numbers in the string
    const answer = numbersArray.map((a) => {
      // check if the string has a number
      if (isNaN(parseInt(a))) {
        return 0;
      }

      if (parseInt(a) > 1000) {
        return 0;
      }

      return parseInt(a);
    }, 0);

    return answer;
  } catch (error) {
    return [];
  }
};
