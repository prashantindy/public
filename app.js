let ApiServer: string | null;

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

    document.getElementById('output')!.textContent = JSON.stringify(msg, undefined, 2);
}

function toggleDebug(elementId: string) {
    document.getElementById(elementId)!.classList.toggle("hidden");
}

async function getMessage(rowId: string | null, datatableId: string | null) {
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

async function doFetch(url: string, config: RequestInit) {
    let rtn;
    let res;

    res = await fetch(url, config);

    if (res.ok) {
        rtn = await res.json();
    } else {
        throw Error(res.statusText);
    }

    return rtn;
}

(window as any).toggleDebug = toggleDebug;
(window as any).init = init;

init();
