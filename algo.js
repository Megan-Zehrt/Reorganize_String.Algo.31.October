// 767. Reorganize String



// Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
// Return any possible rearrangement of s or return "" if not possible.








/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function(s) {
    const map = new Map();

    // Step 1: Count the occurrences of each character
    for (let letter of s) {
        map.set(letter, (map.get(letter) || 0) + 1);
    }

    // Step 2: Create an array to simulate a max heap, sorted by frequency
    const maxHeap = Array.from(map).sort((a, b) => b[1] - a[1]);

    let result = '';
    let prev = null;

    // Step 3: Reorganize the string by selecting characters from the max heap
    while (maxHeap.length > 0) {
        const [letter, count] = maxHeap.shift();

        // Add the letter to the result string
        result += letter;

        // Store the previous character temporarily to prevent consecutive duplicates
        if (prev) maxHeap.push(prev);

        // Decrease count and set as previous if still available
        if (count - 1 > 0) {
            prev = [letter, count - 1];
        } else {
            prev = null;
        }

        // Re-sort the max heap to get the character with the highest remaining frequency
        maxHeap.sort((a, b) => b[1] - a[1]);
    }

    // If the rearranged string is not the same length, it was impossible to reorganize
    return result.length === s.length ? result : '';
};