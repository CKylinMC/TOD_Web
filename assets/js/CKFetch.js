var CKFetch = {};
CKFetch.mergeObject = function (main,sub) {
    for (let key in sub) {
        main[key] = sub[key];
    }
    return main;
}
CKFetch.generateFormData = function (data = null) {
    if (data === null) return undefined;
    let fd = new FormData();
    for (let key in data) {
        fd.append(key, data[key]);
    }
    return fd;
}
CKFetch.generateUrlData = function (data = null) {
    if (data === null) return undefined;
    let url = "";
    let first = true;
    for (let key in data) {
        if (first) first = false;
        else url += "&"
        url+=key+"="+data[key];
    }
    return url;
}
CKFetch.parseUrlData = function (url) {
    let realUrlparts = url.split("#")[0].split("?");
    if (realUrlparts.length < 2) return {};
    let data = {};
    let params = realUrlparts[1].split("&");
    params.forEach((e, i)=>{
        let ep = e.split("=");
        if (ep.length > 1) {
            data[ep[0]] = ep[1];
        } else {
            data[e] = "";
        }
    })
    return data;
}
CKFetch.post = function (url, data = {}, opt = {}) {
    opt.body = this.generateFormData(data);
    opt.method = "post";
    opt.cache = "no-cache";
    return fetch(url, opt);
};
CKFetch.get = function (url, data = {}, opt = {}) {
    // opt.body = this.generateFormData(data);
    let data2url = this.generateUrlData(this.mergeObject(this.parseUrlData, data));
    if (data2url.length > 0) {
        url = url.split("?")[0] + "?" + data2url;
    }
    opt.method = "get";
    opt.cache = "no-cache";
    return fetch(url, opt);
};
CKFetch.json = function (url, data = {}, opt = {}) {
    return this.post(url, data, opt).then(res => res.json());
};

CKFetch.awaitQuery = async function (method, url, data = {}, opt = {}) {
    opt.body = this.generateFormData(data);
    opt.method = method;
    opt.cache = "no-cache";
    return await fetch(url, opt);
}