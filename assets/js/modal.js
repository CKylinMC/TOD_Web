var closeModalTimer;

var modalCallbackFn = () => {
    closeModal()
};

function openModal(content = '', type = '', okbtn = "确认", callback = "") {
    if (closeModalTimer) clearTimeout(closeModalTimer);
    var modalcodes = document.querySelector("#modalTemplate").innerHTML;
    var modalcontainer = document.querySelector("#modal-container");
    var hideclass = "";
    if (okbtn == "nobtn") hideclass = "hide";
    modalcodes = modalcodes.replace("%MODALCLASS%", type).replace("%MODALCONTENT%", content).replace("%OK%", okbtn).replace("%HIDEBTN%", hideclass);
    modalcontainer.innerHTML = modalcodes;
    modalCallbackFn = callback;
}

function modalBtnCallback() {
    if (typeof (modalCallbackFn) === "function") {
        modalCallbackFn.apply(this);
    } else {
        closeModal();
    }
}

function closeModal() {
    if (closeModalTimer) clearTimeout(closeModalTimer);
    var modal = document.querySelector("#modal");
    var backdrop = document.querySelector("#modal-backdrop");
    modal.style.animation = null;
    backdrop.style.animation = null;
    modal.style.animation = "closeModal .3s forwards cubic-bezier(0, 0, 0.07, 1.01)";
    backdrop.style.animation = "fadeOut .3s forwards";
    closeModalTimer = setTimeout(() => {
        var modalcontainer = document.querySelector("#modal-container");
        modalcontainer.innerHTML = "";
        window.closeModalTimer = null;
    }, 300);
}

function modalTitle(title = "") {
    return "<span class=\"modal-title\">" + title + "</span>";
}

function initModal() {
    document.body.innerHTML += `
    <div id="modal-container">
    </div>
    <script type="text/template" id="modalTemplate">
        <div id="modal-backdrop"></div>
        <div id="modal" class="%MODALCLASS% %HIDEBTN%">
            <div class="modal-content">
                %MODALCONTENT%
            </div>
            <div class="modal-btns">
                <button class="btn" onclick="modalBtnCallback();">%OK%</button>
            </div>
        </div>
    </script>`;
}