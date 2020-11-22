// 实现全部替换
String.prototype.replaceAll = function (search, replace) {
    return this.valueOf().replace(new RegExp(search, "g"), replace);
};

Array.prototype.shuffle = function() {
    var array = this;
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
    this.splice(index, 1); 
    } 
};

Array.prototype.indexOf = function(val) { 
    for (var i = 0; i < this.length; i++) { 
    if (this[i] == val) return i; 
    } 
    return -1; 
};

function nothing() {
}

function waitModal(msg = "正在加载...", type = "info") {
    openModal(icon("spinner")+msg, type + " center", "nobtn");
}

function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}

function setCurrentPath(url = location.href, title = document.title) {
    history.replaceState({}, title, url);
    if(!("page" in window)) window.page = {};
    window.page.url = url;
}

function setTitle(title = document.title){
    document.title = title;
    if(!("page" in window)) window.page = {};
    window.page.title = title;
}

function getUriInfo(url) {
    let a = document.createElement("a");
    a.href = url;
    return a;
}

function copy(content) {
    let copycontainer;
    copycontainer = document.querySelector("#copycontainer");
    if (!copycontainer) {
        copycontainer = document.createElement("input");
        copycontainer.id = "copycontainer";
        copycontainer.style.position = "absolute";
        copycontainer.style.top = "-5000px";
        copycontainer.style.left = "-5000px";
        copycontainer.style.opacity = "0";
        document.body.appendChild(copycontainer);
    }
    if (content instanceof HTMLElement) {
        copycontainer.value = content.innerText;
    } else {
        copycontainer.value = content;
    }
    copycontainer.select();
    document.execCommand("copy", false, null);
    showTips("✔️ 已复制","success");
    setTimeout(() => copycontainer.value = "", 50);
}

function domToString(el) {
    if (el instanceof HTMLElement) {
        let cont = document.createElement("div");
        cont.appendChild(el);
        return cont.innerHTML;
    } else {
        return el;
    }
}

function get(query = "body") {
    return document.querySelector(query);
}

function icon(name) {
    if (!name) return "";
    switch (name) {
        default:
            return "";
        case "failed":
        case "error":
            return "<span style=\"color:orangered\">✖</span> ";
        case "ok":
        case "success":
            return "<span style=\"color:#43a047\">✔</span> ";
        case "warn":
        case "alert":
            return "<span style=\"color:#ff9836\">⚠</span> ";
        case "heart":
            return "<span style=\"color:red\">💓</span> ";
        case "spinner":
            return "<span class=\"loading-spinner\"></span> ";
    }
}

function toggleSuperTheme() {
    if (page.superTheme) {
        get("html").classList.remove("superTheme");
    } else {
        get("html").classList.add("superTheme");
    }
    page.superTheme = !page.superTheme;
}

//export CKFetch;

//window.addEventListener("load",e=>{
if ('popNotify' in window) {
    let msg, warnmsg, successmsg, errormsg, infomsg;
    if (msg = getUrlParam("msg")) {
        popNotify.notify("提示", msg, 15000);
    }
    if (warnmsg = getUrlParam("warn")) {
        popNotify.notify("警告", warnmsg, 5000, null, "warn");
    }
    if (infomsg = getUrlParam("info")) {
        popNotify.notify("信息", infomsg, 5000, null, "info");
    }
    if (errormsg = getUrlParam("error")) {
        popNotify.notify("错误", errormsg, 5000, null, "error");
    }
    if (successmsg = getUrlParam("ok")) {
        popNotify.notify("成功", successmsg, 5000, null, "success");
    }
}
//document.onload = e => {
//     let modalcss = document.createElement("link");
//     modalcss.rel = "stylesheet";
//     modalcss.href = "assets/css/modal.css";
//     document.head.appendChild(modalcss);
//     let modaljs = document.createElement("script");
//     modaljs.src = "assets/js/modal.js";
//     document.body.appendChild(modaljs);
//     setTimeout(() => {
//         try {
//             if (!('openModal' in window)) {// Polyfill：模态窗口不能加载时
//                 console.warn("Can NOT load modal framework. Native alert is now instead.");
//                 window.openModal = function(content = '', type = '', okbtn = "确认", callback = "") {
//                     var sp = document.createElement("span");
//                     sp.innerHTML = content;
//                     alert(sp.innerText);
//                     if (typeof callback == "function") callback();
//                 }
//             } else {
//                 initModal();// 初始化模态窗口
//             }
//         } catch (err) {
//             console.warn("Can NOT load modal framework: ", err);
//         }
//     }, 10);
//}
//});