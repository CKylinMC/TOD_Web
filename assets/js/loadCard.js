function updateNote() {
    openModal(window.data.updateNote);
}

function helpModal() {
    openModal(modalTitle("关于“真心话大冒险”") + `
            <h2>使用方法</h2>
            真心话大冒险界面分为上下两部分，默认只显示上半部分。上半部分中，可以输入参与人姓名，输入两个以上参与人后，可以点击“Go!”按钮，会自动在上面所输入人名中选出赢家和输家，快速开局。点击重置可以重置整个界面，包括输入的参与人也会被清空。<br><br>
            下半部分默认不显示，需要点击“真心话”或者“大冒险”按钮选择进入一个模式，进入后自动跳转到对应模式的卡片，将列出所有的问题或要求。点击“随机”可以快速随机到一个卡片。点击卡片的标签可以选择必须包含这个标签，或者禁止包含这个标签。当选择禁止包含或必须包含后，在下半部分的顶部会显示已经筛选的条件标签，点击即可取消。点击重置取消所有筛选。<br><br>
            右下角浮动按钮有“快速随机”和“返回顶部”。“快速随机”按钮仅会在显示下半部分卡片后显示，点击即可快速随机卡片。“返回顶部”按钮仅会在滚动到非顶部区域时显示，点击可以快速回到顶部。
            <br><br>
            <h2>关于“真心话大冒险”</h2>
            这是 <a href="https://www.ckylin.site">我 (CKylinMC)</a> 使用以前的练手作业改的一个项目，代码上仅仅是可以运行的程度，但是所有的功能都是自己写的，包括页面样式。<br><br>
            <b>项目开源地址：</b><br><a href="https://github.com/ckylinmc/TOD_Web">真心话大冒险 网页</a><br><a href="https://github.com/ckylinmc/TOD_Dict">真心话大冒险 语料</a>
            <br><br>
            <button onclick="updateNote()">更新日志</button>
            <br><br>
            欢迎反馈或贡献！
            `);
}

function loadCard2() {
    let card2 = get("#card2");
    if (card2) {
        card2.className = "container anim-in delay";
    }
}

function zxh() {
    // location.href = "?mode=z";
    load_zxh();
}

function dmx() {
    // location.href = "?mode=d";
    load_dmx();
}

function load_zxh() {
    window.data.curr = "zxh";
    showTips("❤️ 真心话");
    let container = get("#card-container");
    if (!container) return;
    let tmpl = get("#temp-zxh");
    if (tmpl) {
        container.innerHTML = tmpl.innerHTML;
        loadCard2();
        setTimeout(() => {
            scrollTo(0, container.offsetTop - 70);
        }, 200);
        loadList("zxh");
    }
}

function load_dmx() {
    window.data.curr = "dmx";
    showTips("⚔️ 大冒险");
    let container = get("#card-container");
    if (!container) return;
    let tmpl = get("#temp-dmx");
    if (tmpl) {
        container.innerHTML = tmpl.innerHTML;
        loadCard2();
        setTimeout(() => {
            scrollTo(0, container.offsetTop - 70);
        }, 200);
        loadList("dmx");
    }
}

function loadData_zxh(force = false, callback) {
    waitModal();
    if (force || Object.keys(window.data.zxh).length == 0) {
        CKFetch.get(window.data.addr.zxh + "?v=" + Math.random()).then(r => r.json()).then(
            json => {
                window.data.zxh = json;
                closeModal();
                if (callback instanceof Function) callback.apply();
            }
        );
    } else {
        closeModal();
        if (callback instanceof Function) callback.apply();
    }
}

function loadData_dmx(force = false, callback = () => {}) {
    waitModal();
    if (force || Object.keys(window.data.dmx).length == 0) {
        CKFetch.get(window.data.addr.dmx + "?v=" + Math.random()).then(r => r.json()).then(
            json => {
                window.data.dmx = json;
                closeModal();
                if (callback instanceof Function) callback.apply();
            }
        );
    } else {
        closeModal();
        if (callback instanceof Function) callback.apply();
    }
}

function tagsModal(e) {
    let t = e.target;
    let tagn = t.innerHTML;
    let modaldom = `
            <button onclick="addExcludeTag('${tagn}')" class="red" style="display:inline-block;margin: 5px auto !important;">排除此标签</button>
            <button onclick="addIncludeTag('${tagn}')" class="green" style="display:inline-block;margin: 5px auto !important;">必须包括此标签</button>
            <button onclick="closeModal()" style="display:block;margin: 5px auto !important">关闭</button>
            `;
    openModal(modalTitle("'" + tagn + "'") + modaldom, "center", "nobtn");
}

function resetFilter() {
    window.data.exclude = [];
    window.data.include = [];
    loadList(window.data.curr);
}

function updateTagsDisplay() {
    let ul, arrs;
    if (window.data.exclude.length) {
        ul = document.createElement("ul");
        ul.className = "s-tags";
        window.data.exclude.forEach(e => {
            let li = document.createElement("li");
            li.className = "s-tag-item";
            li.innerHTML = e;
            li.onclick = ev => rmExcludeTag(ev.target.innerHTML);
            ul.appendChild(li);
        });
        arrs = document.querySelectorAll(".exclude-tags");
        arrs.forEach(e => {
            e.innerHTML = "<h2>排除：</h2>";
            e.appendChild(ul);
            let height = 52;
            [...e.childNodes].forEach(cn => {
                height += cn.offsetHeight;
            })
            e.style.height = height + "px";
            if (e.classList.contains("hide")) e.classList.remove("hide");
        });
    } else {
        arrs = document.querySelectorAll(".exclude-tags");
        arrs.forEach(e => {
            if (!e.classList.contains("hide")) e.classList.add("hide");
            e.innerHTML = "";
        });
    }

    if (window.data.include.length) {
        ul = document.createElement("ul");
        ul.className = "s-tags";
        window.data.include.forEach(e => {
            let li = document.createElement("li");
            li.className = "s-tag-item";
            li.innerHTML = e;
            li.onclick = ev => rmIncludeTag(ev.target.innerHTML);
            ul.appendChild(li);
        });
        arrs = document.querySelectorAll(".include-tags");
        arrs.forEach(e => {
            e.innerHTML = "<h2>包含：</h2>";
            e.appendChild(ul);
            let height = 52;
            [...e.childNodes].forEach(cn => {
                height += cn.offsetHeight;
            })
            e.style.height = height + "px";
            if (e.classList.contains("hide")) e.classList.remove("hide");
        });
    } else {
        arrs = document.querySelectorAll(".include-tags");
        arrs.forEach(e => {
            e.innerHTML = "";
            if (!e.classList.contains("hide")) e.classList.add("hide")
        });
    }
}

function rmExcludeTag(t) {
    console.log(t);
    window.data.exclude.remove(t);
    loadList(window.data.curr);
    closeModal();
}

function rmIncludeTag(t) {
    window.data.include.remove(t);
    loadList(window.data.curr);
    closeModal();
}

function addExcludeTag(t) {
    window.data.exclude.push(t);
    loadList(window.data.curr);
    closeModal();
}

function addIncludeTag(t) {
    window.data.include.push(t);
    loadList(window.data.curr);
    closeModal();
}

function randomOne() {
    let container = get("#" + window.data.curr + "-container");
    if (!container) return;
    let arrs = [...container.children];
    if (arrs.length < 1) return;
    let newarr = arrs.shuffle();
    let e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    newarr[0].dispatchEvent(e);
    scrollTo({
        top: newarr[0].offsetTop + innerHeight / 2,
        behavior: "smooth"
    });
    showTips("🎲 随机模式");
}

function loadList(type) {
    let func = () => {
        let data = window.data.curr == "zxh" ? window.data.zxh : (window.data.curr == "dmx" ? window.data.dmx : {});
        if (data == {}) return;
        let items = data.data;
        if (!items) return;
        let container = get("#" + type + "-container");
        if (!container) return;
        container.innerHTML = "";
        let exclude = window.data.exclude;
        let include = window.data.include;
        items.forEach(e => {
            let flag = true;
            exclude.forEach(t => {
                if (e.tags.includes(t)) {
                    flag = false;
                    return;
                }
            });
            include.forEach(t => {
                if (!e.tags.includes(t)) {
                    flag = false;
                    return;
                }
            });
            if (!flag) return;
            container.appendChild(createItem(e.name, e.tags, true, e.des));
        });
        updateTagsDisplay();

        /* display random btn */
        let btn = get(".random-btn");
        let atop = get(".top");
        let topOffset = 0;
        if (atop) topOffset = atop.offsetTop - atop.offsetHeight - 10;
        if (btn) {
            btn.style.top = topOffset + "px";
            if (!btn.classList.contains("show")) btn.classList.add("show");
        }
        let counter = get(".counter");
        if (counter) counter.innerHTML = `(${container.childElementCount} 条)`;
    }
    if (type == "zxh") return loadData_zxh(false, func);
    else return loadData_dmx(false, func);
}

function makeTag(name = "-", asdom = false) {
    if (asdom) {
        let li = document.createElement("li");
        li.className = "s-tag-item";
        li.innerHTML = name;
        li.onclick = e => tagsModal(e);
        return li;
    } else return `<li class="s-tag-item">{name}</li>`;
}

function doCopy(event, content) {
    copy(content);
    let e = event.target;
    e.style.opacity = 0;
    setTimeout(() => {
        e.innerHTML = "✔️";
        e.style.opacity = 1;
        setTimeout(() => {
            e.style.opacity = 0;
            setTimeout(() => {
                e.innerHTML = "📋";
                e.style.opacity = 1;
            }, 200);
        }, 1000);
    }, 200);
    
}

function createItem(title = "@#$%^&*", tags = [], asdom = false, description = null) {
    if (asdom) {
        let div = document.createElement("div");
        div.onclick = e => {
            let flag = true;
            let targetdom;
            e.composedPath().forEach(i => {
                console.log(i.tagName);
                if (i.tagName && i.tagName.toLowerCase() == "li") flag = false;
                if (i.classList && i.classList.contains("s-item")) targetdom = i;
            });
            if (!flag) return;
            let allactive = document.querySelectorAll(".s-item-active");
            [...allactive].forEach(e => e.classList.remove("s-item-active"));
            targetdom.classList.add("s-item-active");
        }
        div.setAttribute("data-s-tags", tags.join(","));
        div.className = "s-item";
        let h2 = document.createElement("h2");
        h2.innerHTML = title;
        let btn = document.createElement("span");
        btn.className = "s-cpbtn";
        btn.onclick = (ev) => doCopy(ev,title);
        btn.innerHTML = "📋";
        div.appendChild(btn);
        div.appendChild(h2);
        if (description != null) {
            let des = document.createElement("span");
            des.className = "s-des";
            des.innerHTML = description;
            div.appendChild(des);
        }
        let ul = document.createElement("ul");
        ul.className = "s-tags";
        tags.forEach(e => ul.appendChild(makeTag(e, true)));
        div.appendChild(ul);
        return div;
    } else {
        let tagshtml = "";
        tags.forEach(e => tagshtml += makeTag(e));
        let domhtml = ` <div class="s-item" data-s-tags="%TAGSTR%">
                                    <h2>%TITLE%</h2>
                                    <ul class="s-tags">
                                        %TAGS%
                                    </ul>
                                </div>`;
        domhtml = domhtml.replace("%TITLE%", title).replace("%TAGS%", tagshtml).replace("%TAGSTR%", tags.join(","));
        return domhtml;
    }
}
