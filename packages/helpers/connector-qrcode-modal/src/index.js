const node = require("./node");
const browser = require("./browser");

const isNode = () =>
    typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.node !== "undefined";

exports.open = function (uri, cb) {
    isNode() ? node.open(uri) : browser.open(uri, cb);
}

exports.close = function () {
    isNode() ? node.close() : browser.close();
}
