export const timeFormatter = uptime => {
    const currentTime = new Date().getTime()
    const difference = currentTime - uptime
    const date = new Date(difference)
    return date.toLocaleString()

}


export const toPercent = (number, decimals) => {
    // Multiply the number by 100
    let percent = number * 100;
    // Format the percent value with the given number of decimal places
    percent = percent.toFixed(decimals);
    // Append a percent sign to the end of the string
    percent = percent + "%";
    // Return the percentage value as a string
    return percent;
  }

  export const outputProperties = (obj) => {
    // Loop through the object keys
    for (let key in obj) {
      // Get the value of the current key
      let value = obj[key];
      // Check the type of the value
      if (typeof value === "object" && value !== null) {
        // If the value is another object, call the function recursively
        outputProperties(value);
      } else {
        // If the value is not an object, print the key and the value
        console.log("output", key + ": " + value);
        return key + value
      }
    }
  }