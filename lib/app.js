let ApiServer;
async function init() {
    let msg;
    let params;
    let rowId;
    let dataTableName;
    let input;
    let value;
    params = new URLSearchParams(window.location.search);
    rowId = params.get('rowId');
    ApiServer = params.get('apiServer');
    dataTableName = params.get('dataTableName');
    msg = await getMessage(rowId, dataTableName);
    input = document.getElementById('company_name');
    value = msg.DataTable.name_customer;
    input.value = value;
    input = document.getElementById('contact_name');
    value = msg.DataTable.contact_customer;
    input.value = value;
    document.getElementById('output').textContent = JSON.stringify(msg, undefined, 2);
}
function toggleDebug(elementId) {
    document.getElementById(elementId).classList.toggle("hidden");
}
async function getMessage(rowId, dataTableName) {
    let rtn;
    let headers;
    let config;
    headers = {
        'rowid': '' + rowId,
        'dataTableName': '' + dataTableName
    };
    config = {
        method: 'GET',
        mode: 'no-cors',
        headers: headers
    };
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
window.toggleDebug = toggleDebug;
window.init = init;
init();
export {};
