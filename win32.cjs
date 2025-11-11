const generateAllCombinations = require("./util.cjs");

const avx = ["-D LLAMA_AVX=ON", "-D LLAMA_AVX2=ON", "-D LLAMA_AVX512=ON"];

const amx = [
  "-D GGML_AMX_INT8=ON",
  "-D GGML_AMX_BF16=ON",
  "-D GGML_AMX_TILE=ON",
  "",
];

/**
 * @type {[string[]][]}
 */
const allCombinations = generateAllCombinations(avx, amx);

allCombinations.push(avx.join(" "));

console.log(allCombinations);

module.exports = () => {
  return allCombinations;
};
