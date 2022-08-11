const svgUrlLoader = require("svg-url-loader");

const buildAsset = require("./build-asset");

buildAsset({
  assetFile: "logo.svg",
  targetFile: "logo.ts",
  targetVar: "BITIZEN_LOGO_URL",
  loader: input =>
    svgUrlLoader(input)
      .replace(`module.exports = "`, "")
      .replace(`"`, ""),
});

buildAsset({
  assetFile: "big_logo.svg",
  targetFile: "big_logo.ts",
  targetVar: "BIG_LOGO_SVG_URL",
  loader: input =>
    svgUrlLoader(input)
      .replace(`module.exports = "`, "")
      .replace(`"`, ""),
});

buildAsset({
  assetFile: "close.svg",
  targetFile: "close.ts",
  targetVar: "CLOSE_SVG_URL",
  loader: input =>
    svgUrlLoader(input)
      .replace(`module.exports = "`, "")
      .replace(`"`, ""),
});
