import * as Web3Utils from "web3-utils";
export function shortenAddress(pAddress, pDigits = 4) {
    if (!isAddress(pAddress)) {
        throw Error(`Invalid 'address' parameter '${pAddress}'.`);
    }
    return `${pAddress.substring(0, pDigits + 2)}...${pAddress.substring(
        42 - pDigits
    )}`;
}

export function isAddress(pValue) {
    try {
        return Web3Utils.isAddress(pValue.toLowerCase());
    } catch {
        return false;
    }
}

export function showError(pValue) {
    const appEl = document.querySelector(".App");
    const alertEl = document.createElement("div");
    alertEl.classList.add("alert");
    const alertChildEl = document.createElement("div");
    alertChildEl.classList.add("alert-container");
    alertChildEl.textContent = pValue;
    alertEl.appendChild(alertChildEl);
    appEl.appendChild(alertEl);
    setTimeout(() => {
        appEl.removeChild(alertEl);
    }, 3000);
}
