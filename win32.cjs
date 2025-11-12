const generateAllCombinations = require("./util.cjs");

const avx = [
  ["-noavx", "-D LLAMA_AVX=OFF -D LLAMA_AVX2=OFF -D LLAMA_AVX512=OFF"],
  ["-avx", "-D LLAMA_AVX=ON -D LLAMA_AVX2=OFF -D LLAMA_AVX512=OFF"],
  ["-avx2", "-D LLAMA_AVX=ON -D LLAMA_AVX2=ON -D LLAMA_AVX512=OFF"],
  ["-avx512", "-D LLAMA_AVX=ON -D LLAMA_AVX2=OFF -D LLAMA_AVX512=ON"],
];

const amx = [
  ["-amx_int8", "-D GGML_AMX_INT8=ON"],
  ["-amx_int16", "-D GGML_AMX_BF16=ON"],
  ["-amx_tile", "-D GGML_AMX_TILE=ON"],
  ["", ""],
];

/**
 * @type {[string[]][]}
 */
const allCombinations = generateAllCombinations(avx, amx);

allCombinations.push([["-none", ""]]);
allCombinations.push([
  ["-univ", avx.map((x) => x[1]).join(" ")],
  ["-famx", amx.map((x) => x[1]).join(" ")],
]);

// { flags: string, suffix: string }
const out = [];

allCombinations.forEach((comb) => {
  let flags = [];
  let suffix = "";

  comb.forEach((data) => {
    const [s, flag] = data;

    suffix += s;
    flags.push(flag);
  });

  out.push({
    flags: flags.join(" "),
    suffix,
  });
});

module.exports = () => {
  return out;
};
