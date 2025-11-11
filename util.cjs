/**
 * Computes the Cartesian Product of N arrays (groups).
 * This is the correct method for generating test combinations when a user
 * must select exactly one option from each independent group.
 *
 * @param {Array<Array<string>>} groups An array containing N flag groups (each group is an array of strings).
 * @returns {Array<Array<string>>} An array of arrays, where each inner array is a full combination.
 */
function cartesianProduct(groups) {
  if (groups.length === 0) {
    return [[]]; // Base case: one combination of zero elements (the empty set)
  }

  const firstGroup = groups[0];
  const restGroups = groups.slice(1);
  const combinationsOfRest = cartesianProduct(restGroups);
  const result = [];

  for (const item of firstGroup) {
    for (const restCombination of combinationsOfRest) {
      // Prepend the current item to all combinations from the rest
      result.push([item, ...restCombination]);
    }
  }
  return result;
}

/**
 * Generates combinations by selecting exactly one flag from each array passed as an argument.
 * The final output is an array of space-separated strings, ready for use as build commands.
 *
 * @param {...Array<string>} groups An arbitrary number of flag groups (arrays of strings).
 * @returns {Array<string>} An array of single, space-separated combination strings.
 */
module.exports = function generateCombinations(...groups) {
  if (!groups.every(Array.isArray)) {
    console.error("Error: All arguments must be arrays of strings.");
    return [];
  }

  const rawCombinations = cartesianProduct(groups);

  // Format the raw combinations (arrays of strings) into single space-separated strings
  return rawCombinations.map((combo) => {
    // Filter out any empty strings that might be passed in a group (e.g., the 'no flag' option)
    return combo.filter((flag) => flag && flag.trim().length > 0).join(" ");
  });
};
