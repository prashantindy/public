async function init() {
    console.log('App initialized.');
    document.getElementById('output').textContent = greet('Prashant');
    let msg;
    msg = await getMessage();
    console.log("message: " + JSON.stringify(msg));
    console.log("host: " + window.location.host);
    console.log("hostname: " + window.location.hostname);
    console.log("origin: " + window.location.origin);
}
function greet(name) {
    return `Hello, ${name}!`;
}
async function getMessage() {
    let rtn;
    let headers;
    let config;
    headers = {};
    config = {
        method: 'GET',
        headers: headers
    };
    rtn = doFetch(`${window.location.origin}/message`, config);
    return rtn;
}
async function doFetch(url, config) {
    let rtn;
    let res;
    res = await fetch(url, config);
    if (res.ok) {
        rtn = await res.json();
    }
    else {
        throw Error(res.statusText);
    }
    return rtn;
}
init();
export {};
