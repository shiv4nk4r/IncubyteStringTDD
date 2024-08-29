export const add = (numbers: string): number => {
  // handle empty, null and undefined string
  if (numbers === "" || numbers == null) return 0;

  const defaultDelimeter = ",";
  let delimeter = defaultDelimeter;

  // Handle if the string is just the delimeter
  if (numbers === defaultDelimeter) return 0;

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
    if (!numbers) return 0;

    // if the string has a new line character then replace it with the delimeter
    if (numbers.includes("\n")) {
      numbers = numbers.replace("\n", delimeter);
    }

    // splitting the string with the delimeter
    const numbersArray = numbers.split(delimeter);

    // check if the string has negative numbers
    const negativeNumbers = numbersArray.filter((a) => parseInt(a) < 0);

    // if the string has negative numbers then throw an error
    if (negativeNumbers.length > 0) {
      throw new Error(
        `negative numbers not allowed ${negativeNumbers.join(",")}`
      );
    }

    // sum all the numbers in the string
    const answer = numbersArray.reduce((partialSum, a) => {
      // check if the string has a number
      if (isNaN(parseInt(a))) {
        return partialSum;
      }

      return partialSum + parseInt(a);
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
