function showTips(msg = "",type = ""){
    let dom = document.querySelector("#tip-container");
    if(dom){
        let html = "<div class=\"tip %MSGTYPE%\">%MSG%</div>";
        dom.innerHTML = "";
        dom.innerHTML = html.replace("%MSG%",msg).replace("%MSGTYPE%",type);
    }
}
function initTips() {
    document.body.innerHTML+=`<div id="tip-container"></div>`;
}