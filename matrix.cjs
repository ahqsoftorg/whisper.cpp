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
    flags: "-G Ninja -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++",
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
    os: "macos-univ",
    name: "Macos Universal",
    vulkan: false,
    suffix: "",
    flags:
      '-DGGML_METAL_USE_BF16=ON -DGGML_METAL_EMBED_LIBRARY=ON -DWHISPER_BUILD_EXAMPLES=OFF -DWHISPER_BUILD_TESTS=OFF -DWHISPER_BUILD_SERVER=OFF -DCMAKE_OSX_ARCHITECTURES="arm64;x86_64"',
  },
  {
    runner: "macos-latest",
    os: "ios",
    name: "iOS",
    vulkan: false,
    suffix: "",
    flags:
      "-DGGML_METAL_USE_BF16=ON -DGGML_METAL_EMBED_LIBRARY=ON -DWHISPER_BUILD_EXAMPLES=OFF -DWHISPER_BUILD_TESTS=OFF -DWHISPER_BUILD_SERVER=OFF -DCMAKE_OSX_DEPLOYMENT_TARGET=14.0 -DCMAKE_XCODE_ATTRIBUTE_DEVELOPMENT_TEAM=ggml -DCMAKE_SYSTEM_NAME=iOS",
  },
];

const androidMatrix = ["arm64-v8a", "armeabi-v7a", "x86_64", "x86"].map(
  (arch) => ({
    runner: "ubuntu-latest",
    os: `android-${arch}`,
    name: `Android ${arch}`,
    vulkan: false,
    suffix: ``,
    flags: `-B build/${arch} -DCMAKE_TOOLCHAIN_FILE=${process.env.ANDROID_NDK_HOME}/build/cmake/android.toolchain.cmake -DANDROID_ABI=${arch} -DANDROID_PLATFORM=android-21 -DCMAKE_BUILD_TYPE=Release`,
  })
);

const outputs = [
  ...winMatrix,
  ...linuxMatrix,
  ...macosMatrix,
  ...androidMatrix,
];

console.log(outputs);
console.log(outputs.length);

// Generates full matrix declaration!
module.exports = () => {
  return outputs;
};
