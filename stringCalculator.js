class StringCalculator {
  add(numbers) {
    // If the input string is empty, return 0
    if (numbers === "") {
      return 0;
    }

    let delimiter = /,|\n/; // Default delimiters: comma and newline
    if (numbers.startsWith("//")) {
      // If there's a custom delimiter
      const delimiterEndIndex = numbers.indexOf("\n"); // Find the end of the delimiter definition
      delimiter = new RegExp(numbers.substring(2, delimiterEndIndex)); // Extract the custom delimiter
      numbers = numbers.substring(delimiterEndIndex + 1); // Remove the delimiter definition from the numbers string
    }

    const numberArray = numbers.split(delimiter); // Split the numbers string by the delimiter(s)
    const negatives = []; // Array to hold any negative numbers

    // Calculate the sum of the numbers
    const sum = numberArray.reduce((total, num) => {
      const number = parseInt(num, 10); // Convert the string to an integer
      if (number < 0) {
        negatives.push(number); // If the number is negative, add it to the negatives array
      }
      return total + number; // Add the number to the running total
    }, 0);

    // If there are any negative numbers, throw an error
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return sum; // Return the sum of the numbers
  }
}

// Examples to demonstrate the functionality
const calculator = new StringCalculator();
console.log(calculator.add("")); // Output: 0
console.log(calculator.add("1")); // Output: 1
console.log(calculator.add("1,5")); // Output: 6
console.log(calculator.add("1\n2,3")); // Output: 6
console.log(calculator.add("//;\n1;2")); // Output: 3

// Example to demonstrate error handling for negative numbers
try {
  console.log(calculator.add("1,-2,3,-4")); // Throws error
} catch (e) {
  console.error(e.message); // Output: Negative numbers not allowed: -2, -4
}
