import QRCode from "qrcode";
import MobileDetect from "mobile-detect";

import { BIG_LOGO_SVG_URL } from "./assets/big_logo";
import { BITIZEN_LOGO_URL } from "./assets/logo";
import { CLOSE_SVG_URL } from "./assets/close";
import { ROBOTO_TTF_URL } from './assets/Roboto-Regular';

const BZ_CONNECTOR_MODAL_ID = "bz-connector-modal";
const BZ_UNIVERSAL_LINK = "https://bitizen.org/wallet/";

const isMobile = () => {
    var md = new MobileDetect(window.navigator.userAgent);
    return md.mobile() || md.tablet();
}

async function formatQRCodeImage(data: any) {
    const qrContainer = document.createElement("div")
    qrContainer.setAttribute('style', `display: flex;
    justify-content: center;
    align-items: center;`)
    let result = "";
    const dataString = await QRCode.toString(data, { margin: 0, type: "svg" });
    if (typeof dataString === "string") {
        result = dataString.replace("<svg", `<svg class="walletconnect-qrcode__image"`);
    }
    qrContainer.innerHTML += result;
    const logo = document.createElement("img")
    logo.setAttribute('src', BITIZEN_LOGO_URL)
    logo.setAttribute('style', `position: absolute;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;`)
    qrContainer.appendChild(logo)
    return qrContainer;
}

export function close() {
    if (isMobile()) {
        return;
    }

    const modal = document.getElementById(BZ_CONNECTOR_MODAL_ID);
    if (modal) {
        document.body.removeChild(modal);
    }
}

export async function open(uri: string, cb: any) {
    uri = BZ_UNIVERSAL_LINK + uri.replace('wc:', 'wc?uri=');

    if (isMobile()) {
        window.open(uri);
        return;
    }

    const modal = document.createElement("div")
    modal.id = BZ_CONNECTOR_MODAL_ID;
    modal.setAttribute('style', `z-index: 2147483647;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;`)
    modal.onclick = () => {
        cb()
        close()
    }

    const style = document.createElement('style')
    style.innerHTML = `@font-face {
    font-family: 'Roboto';
    src: url("`+ ROBOTO_TTF_URL + `") format('truetype');
}`
    modal.appendChild(style)

    const modalContainer = document.createElement("div");
    modalContainer.setAttribute('style', "width: 500px")
    modalContainer.onclick = (e) => { e.stopPropagation() }

    const header = document.createElement("div");
    header.setAttribute('style', `padding-bottom: 20px;
    display: flex;
    justify-content: space-between;`)

    const logo = document.createElement("img")
    logo.setAttribute('src', BIG_LOGO_SVG_URL)
    header.appendChild(logo)

    const closeBtn = document.createElement("img")
    closeBtn.setAttribute('src', CLOSE_SVG_URL)
    closeBtn.onclick = () => {
        cb()
        close()
    }
    header.appendChild(closeBtn)
    modalContainer.appendChild(header)

    const content = document.createElement("div")
    content.setAttribute('style', `padding: 30px 50px;
    background: #FFFFFF;
    border-radius: 24px;`)

    const title = document.createElement("h1")
    title.innerText = 'Scan QR code with Bitizen Wallet'
    title.setAttribute('style', `font-style: normal;
    font-family: Roboto;
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
    color: #373C44;
    margin-top: unset;
    margin-bottom: 10px;
    text-align: center;`)

    content.appendChild(title)
    content.appendChild(await formatQRCodeImage(uri))

    const dontHaveBitizen = document.createElement("h2")
    dontHaveBitizen.innerText = 'Don’t have Bitizen Wallet?'
    dontHaveBitizen.setAttribute('style', `font-style: normal;
    font-family: Roboto;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #373C44;
    margin-top: 10px;
    text-align: center;
    margin-bottom: unset;`)
    content.appendChild(dontHaveBitizen)

    const downloadLinkContainer = document.createElement("div")
    downloadLinkContainer.setAttribute('style', `text-align: center;`)
    const downloadLink = document.createElement("a")
    downloadLink.href = "https://bitizen.org"
    downloadLink.innerText = 'Download Here'
    downloadLink.setAttribute('style', `font-style: normal;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #319CFF;
    text-decoration: unset;`)
    downloadLinkContainer.appendChild(downloadLink)
    content.appendChild(downloadLinkContainer)

    modalContainer.appendChild(content)

    modal.appendChild(modalContainer)

    document.body.appendChild(modal)
}
