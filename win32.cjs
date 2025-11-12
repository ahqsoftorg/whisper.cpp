const generateAllCombinations = require("./util.cjs");

const avx = [
  ["-noavx", "-D GGML_AVX=OFF -D GGML_AVX2=OFF -D GGML_AVX512=OFF"],
  ["-avx", "-D GGML_AVX=ON -D GGML_AVX2=OFF -D GGML_AVX512=OFF"],
  ["-avx2", "-D GGML_AVX=OFF -D GGML_AVX2=ON -D GGML_AVX512=OFF"],
  ["-avx512", "-D GGML_AVX=OFF -D GGML_AVX2=OFF -D GGML_AVX512=ON"],
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
