import QRCode from "qrcode";
import bigLogoSvg from "url:./assets/big_logo.svg";
import logoSvg from "url:./assets/logo.svg";
import closeSvg from "url:./assets/close.svg";
import roboto from 'url:./assets/Roboto-Regular.ttf';
import MobileDetect from "mobile-detect";

const BZ_CONNECTOR_MODAL_ID = "bz-connector-modal";
const BZ_UNIVERSAL_LINK = "https://bitizen.org/wallet/";

const isMobile = () => {
    var md = new MobileDetect(window.navigator.userAgent);
    return md.mobile() || md.tablet();
}

async function formatQRCodeImage(data) {
    const qrContainer = document.createElement("div")
    qrContainer.style = `display: flex;
    justify-content: center;
    align-items: center;`
    let result = "";
    const dataString = await QRCode.toString(data, { margin: 0, type: "svg" });
    if (typeof dataString === "string") {
        result = dataString.replace("<svg", `<svg class="walletconnect-qrcode__image"`);
    }
    qrContainer.innerHTML += result;
    const logo = document.createElement("img")
    logo.setAttribute('src', logoSvg)
    logo.style = `position: absolute;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;`
    qrContainer.appendChild(logo)
    return qrContainer;
}

exports.close = function () {
    if (isMobile()) {
        return;
    }

    const modal = document.getElementById(BZ_CONNECTOR_MODAL_ID);
    if (modal) {
        document.body.removeChild(modal);
    }
}

exports.open = async function (uri, cb) {
    uri = BZ_UNIVERSAL_LINK + uri;

    if (isMobile()) {
        window.open(uri);
        return;
    }

    const modal = document.createElement("div")
    modal.id = BZ_CONNECTOR_MODAL_ID;
    modal.style = `z-index: 2147483647;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;`;
    modal.onclick = () => {
        cb()
        exports.close()
    }

    modal.innerHTML = `<style>@font-face {
  font-family: 'Roboto';
  src: url('`+ roboto + `')  format('truetype');
}</style>`

    const modalContainer = document.createElement("div");
    modalContainer.style = "width: 500px";
    modalContainer.onclick = (e) => { e.stopPropagation() }

    const header = document.createElement("div");
    header.style = `padding-bottom: 20px;
    display: flex;
    justify-content: space-between;`

    const logo = document.createElement("img")
    logo.setAttribute('src', bigLogoSvg)
    header.appendChild(logo)

    const closeBtn = document.createElement("img")
    closeBtn.setAttribute('src', closeSvg)
    closeBtn.onclick = () => {
        cb()
        exports.close()
    }
    header.appendChild(closeBtn)
    modalContainer.appendChild(header)

    const content = document.createElement("div")
    content.style = `padding: 30px 50px;
    background: #FFFFFF;
    border-radius: 24px;`;

    const title = document.createElement("h1")
    title.innerText = 'Scan QR code with Bitizen Wallet'
    title.style = `font-style: normal;
    font-family: Roboto;
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
    color: #373C44;
    margin-top: unset;
    margin-bottom: 10px;
    text-align: center;`

    content.appendChild(title)
    content.appendChild(await formatQRCodeImage(uri))

    const dontHaveBitizen = document.createElement("h2")
    dontHaveBitizen.innerText = 'Don’t have Bitizen Wallet?'
    dontHaveBitizen.style = `font-style: normal;
    font-family: Roboto;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #373C44;
    margin-top: 10px;
    text-align: center;
    margin-bottom: unset;`
    content.appendChild(dontHaveBitizen)

    const downloadLinkContainer = document.createElement("div")
    downloadLinkContainer.style = `text-align: center;`
    const downloadLink = document.createElement("a")
    downloadLink.href = "https://bitizen.org"
    downloadLink.innerText = 'Download Here'
    downloadLink.style = `font-style: normal;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #319CFF;
    text-decoration: unset;`
    downloadLinkContainer.appendChild(downloadLink)
    content.appendChild(downloadLinkContainer)

    modalContainer.appendChild(content)

    modal.appendChild(modalContainer)

    document.body.appendChild(modal)
}
