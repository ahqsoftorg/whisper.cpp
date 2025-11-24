const generateAllCombinations = require("./util.cjs");

// { os: 'windows', runner: 'windows-latest', suffix: '', flags: '', name: 'Windows (Static)' },

const vulkan = [
  ["", "", ""],
  // Vulkan is actually unsupported on GH Actions
  // [" -DGGML_VULKAN=1", " Vulkan", "-vulkan"],
];

const winArch = [
  {
    runner: "windows-latest",
    os: "windows-x64",
    name: "Windows X64",
    flags: "",
  },
  {
    runner: "windows-11-arm",
    os: "windows-arm64",
    name: "Windows Arm64",
    flags: "-DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++",
  },
];

const linuxArch = [
  { runner: "ubuntu-22.04", os: "linux-x64", name: "Linux X64" },
  { runner: "ubuntu-22.04-arm", os: "linux-arm64", name: "Linux Arm64" },
];

const winMatrix = generateAllCombinations(winArch, vulkan).map((data) => {
  const [prelude, ...combos] = data;

  const out = {
    ...prelude,
    suffix: "",
    vulkan: false,
  };

  combos.forEach((combo) => {
    const [flag, name, suffix] = combo;

    if (name.length != 0) {
      out.name += name;
    }

    if (flag.length != 0) {
      out.flags += flag;
    }

    if (suffix.length != 0) {
      out.suffix += suffix;

      if (suffix == "-vulkan") {
        out.vulkan = true;
      }
    }
  });

  return out;
});

const linuxMatrix = generateAllCombinations(linuxArch, vulkan).map((data) => {
  const [prelude, ...combos] = data;

  const out = {
    ...prelude,
    vulkan: false,
    suffix: "",
    flags: "",
  };

  combos.forEach((combo) => {
    const [flag, name, suffix] = combo;

    if (name.length != 0) {
      out.name += name;
    }

    if (flag.length != 0) {
      out.flags += flag;
    }

    if (suffix.length != 0) {
      out.suffix += suffix;

      if (suffix == "-vulkan") {
        out.vulkan = true;
      }
    }
  });

  return out;
});

const macosMatrix = [
  {
    runner: "macos-latest",
    os: "macos-arm64",
    name: "Macos Arm64",
    vulkan: false,
    suffix: "",
    flags: "",
  },
  {
    runner: "macos-15-intel",
    os: "macos-x64",
    name: "Macos X64",
    vulkan: false,
    suffix: "",
    flags: "",
  },
];

const outputs = [...winMatrix, ...linuxMatrix, ...macosMatrix];

console.log(outputs);
console.log(outputs.length);

// Generates full matrix declaration!
module.exports = () => {
  return outputs;
};
