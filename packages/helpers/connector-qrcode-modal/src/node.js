import QRCode from "qrcode";

exports.open = function (uri) {
    QRCode.toString(uri, { type: "terminal" }).then(console.log);
}

exports.close = function () {

}
