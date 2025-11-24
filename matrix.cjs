const generateAllCombinations = require("./util.cjs");

// { os: 'windows', runner: 'windows-latest', suffix: '', flags: '', name: 'Windows (Static)' },

const modes = [
  [" -DBUILD_SHARED_LIBS=OFF", " Static", "-static"],
  [" -DBUILD_SHARED_LIBS=ON", " Dylib", ""],
];

const vulkan = [
  ["", "", ""],
  [" -DGGML_VULKAN=1", " Vulkan", "-vulkan"],
];

const winArch = [
  { runner: "windows-latest", os: "windows-x64", name: "Windows X64" },
  { runner: "windows-11-arm", os: "windows-arm64", name: "Windows Arm64" },
];

const linuxArch = [
  { runner: "ubuntu-22.04", os: "linux-x64", name: "Linux X64" },
  { runner: "ubuntu-22.04-arm", os: "linux-arm64", name: "Linux Arm64" },
];

const winMatrix = generateAllCombinations(winArch, modes, vulkan)
  .map((data) => {
    const [prelude, ...combos] = data;

    const out = {
      ...prelude,
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
      }
    });

    return out;
  })
  .filter((data) => {
    return data.suffix.startsWith("-static")
      ? data.suffix == "-static"
      : data.suffix != "";
  });

const linuxMatrix = generateAllCombinations(linuxArch, modes, vulkan)
  .map((data) => {
    const [prelude, ...combos] = data;

    const out = {
      ...prelude,
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
      }
    });

    return out;
  })
  .filter((data) => {
    return data.suffix.startsWith("-static")
      ? data.suffix == "-static"
      : data.suffix != "";
  });

const macosMatrix = [
  {
    runner: "macos-latest",
    os: "macos-arm64",
    name: "Macos Arm64 Static",
    suffix: "-static",
    flags: " -DBUILD_SHARED_LIBS=OFF",
  },
  {
    runner: "macos-15-intel",
    os: "macos-x64",
    name: "Macos X64 Static",
    suffix: "-static",
    flags: " -DBUILD_SHARED_LIBS=OFF",
  },
];

const outputs = [...winMatrix, ...linuxMatrix, ...macosMatrix];

console.log(outputs);
console.log(outputs.length);

// Generates full matrix declaration!
module.exports = () => {
  return outputs;
};
