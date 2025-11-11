const generateAllCombinations = require("./util.cjs");

const avx = [
  ["-avx", "-D LLAMA_AVX=ON"],
  ["-avx2", "-D LLAMA_AVX2=ON"],
  ["-avx512", "-D LLAMA_AVX512=ON"],
];

const amx = [
  ["-int8", "-D GGML_AMX_INT8=ON"],
  ["-int16", "-D GGML_AMX_BF16=ON"],
  ["-amx-tile", "-D GGML_AMX_TILE=ON"],
  ["-int8-int16", "-D GGML_AMX_INT8=ON -D GGML_AMX_BF16=ON"],
  [
    "-int8-int16-amx-tile",
    "-D GGML_AMX_INT8=ON -D GGML_AMX_BF16=ON -D GGML_AMX_TILE=ON",
  ],
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
