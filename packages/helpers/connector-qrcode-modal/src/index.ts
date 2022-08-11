import * as node from "./node";
import * as browser from "./browser";

const isNode = () =>
    typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.node !== "undefined";

function open(uri: any, cb: any, options?: any) {
    isNode() ? node.open(uri) : browser.open(uri, cb);
}

function close() {
    isNode() ? node.close() : browser.close();
}

export default { open, close }