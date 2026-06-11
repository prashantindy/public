let ApiServer;
async function init() {
    let msg;
    let params;
    let rowId;
    let datatableId;
    params = new URLSearchParams(window.location.search);
    rowId = params.get('rowId');
    datatableId = params.get('datatableId');
    ApiServer = params.get('apiServer');
    msg = await getMessage(rowId, datatableId);
    // console.log("message: " + JSON.stringify(msg));
    // document.getElementById('output')!.textContent = greet('Prashant');
    document.getElementById('output').textContent = JSON.stringify(msg);
}
// function greet(name: string) {
//     return `Hello, ${name}!`;
// }
async function getMessage(rowId, datatableId) {
    let rtn;
    let headers;
    let config;
    headers = {
        'rowid': '' + rowId,
        'datatableid': '' + datatableId
    };
    config = {
        method: 'GET',
        headers: headers
    };
    // rtn = doFetch(`${window.location.origin}/message`, config);
    rtn = doFetch(`${ApiServer}/message`, config);
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
