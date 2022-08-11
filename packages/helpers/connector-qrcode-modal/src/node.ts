import QRCode from "qrcode";

export function open(uri: any) {
    QRCode.toString(uri, { type: "terminal" }).then(console.log);
}

export function close() {

}
