const { randomInt } = require("node:crypto");

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateShareCode() {
  return Array.from(
    { length: 6 },
    () => alphabet[randomInt(alphabet.length)]
  ).join("");
}

module.exports = { generateShareCode };