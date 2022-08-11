const buildAsset = require("./build-asset");

buildAsset({
  assetFile: "Roboto-Regular.ttf",
  targetFile: "Roboto-Regular.ts",
  targetVar: "ROBOTO_TTF_URL",
  loader: input => 'data:application/font-sfnt;base64,' + input.toString("base64"),
});
