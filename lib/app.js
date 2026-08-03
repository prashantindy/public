let ApiServer;
async function init() {
    let msg;
    let params;
    let rowId;
    let datatableId;
    let input;
    let value;
    params = new URLSearchParams(window.location.search);
    rowId = params.get('rowId');
    datatableId = params.get('datatableId');
    ApiServer = params.get('apiServer');
    msg = await getMessage(rowId, datatableId);
    input = document.getElementById('company_name');
    value = msg.DataTable.name_customer;
    input.value = value;
    input = document.getElementById('contact_name');
    value = msg.DataTable.contact_customer;
    input.value = value;
    if (msg.DataTable) {
        for (const key in msg.DataTable) {
            console.log(key, msg.DataTable[key]);
            try {
                document.getElementById(key).textContent = JSON.stringify(msg, undefined, 2);
            }
            catch (e) {
            }
        }
    }
    console.log("msg: " + window.message);
    console.log(msg.DataTable);
    document.getElementById('output').textContent = JSON.stringify(msg, undefined, 2);
}
function toggleDebug(elementId) {
    document.getElementById(elementId).classList.toggle("hidden");
}
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
