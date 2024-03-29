function resetGame() {
    window.gameData = {
        rows: 0,
        root: get("#game-names")
    };
    gameData.root.innerHTML = "";
    gameData.root.oninput = gameData.root.onkeydown = e => Game_rowEvent(e);
    Game_addNewRow();
    if (!get("#game-result").classList.contains("hide")) get("#game-result").classList.add("hide");
    get("#game-go").disabled = false;
}

function Game_addNewRow(){
    let li = document.createElement("li");
    let input = document.createElement("input");
    let span = document.createElement("span");
    span.innerHTML = (++gameData.rows)+" ";
    input.type = "text";
    li.classList.add("game-name-item");
    li.appendChild(span);
    li.appendChild(input);
    gameData.root.appendChild(li);
    li.style.height = input.offsetHeight + "px";
}

function Game_rowEvent(event) {
    console.log(event);
    let target = event.target.parentNode;
    let input = event.target;
    if(gameData.root.childElementCount>0){
        if (input.value.trim() != "" && target == gameData.root.lastElementChild) {
            Game_addNewRow();
        }
        if ((event.inputType && event.inputType == "deleteContentBackward")
            || (event.key && event.key == "Backspace")
            || (event.code && event.code == "Backspace")
        ){
            if (input.value.trim() == "" && target != gameData.root.firstElementChild) {
                // console.log(target.previousElementSibling);
                target.previousElementSibling.children[1].focus();
                // if(target)
            }
        }
        if (target.nextElementSibling//不是最后一个元素
            && input.value.trim() == ""//是空的
            && target.nextElementSibling == gameData.root.lastElementChild//下一个元素是最后一个元素
            && target.nextElementSibling.children[1].value.trim() == ""//下一个元素也是空的
        ) {
            gameData.rows--;
            target.nextElementSibling.style.animation = "item-out .3s forwards";
            setTimeout(()=>
            target.nextElementSibling.remove(),300);
        }
    } else {
        Game_addNewRow();
    }
}

function Game_allGamers() {
    if (gameData.root.childElementCount > 0) {
        let arr = [];
        [...gameData.root.children].forEach((e, i) => {
            let input = e.children[1];
            if (input && input.value.trim() != "") {
                arr.push(input.value.trim());
            }
        });
        return arr;
    } else return [];
}

function Game_Go() {
    get("#game-go").disabled = true;
    if (!get("#game-result").classList.contains("hide")) get("#game-result").classList.add("hide");
    setTimeout(() => {
        let arr = Game_allGamers();
        if (arr.length < 2) {
            get("#game-result").innerHTML = "至少需要有两个参与者。".fontcolor("red").bold().fontsize(5);
            get("#game-result").classList.remove("hide");
        } else {
            get("#game-result").innerHTML = "";
            let randarr = arr.shuffle();
            let span = document.createElement("span");
            span.innerHTML = "共计 " + arr.length + " 个参与者。";
            get("#game-result").appendChild(span);
            let ul = document.createElement("ul");
            ul.classList.add("multi-column-menu");
            ul.style.paddingLeft=0;
            let winner = document.createElement("li"); 
            winner.innerHTML = "获胜者".fontcolor("blue").fontsize("5") + "<br>" + randarr[0].fontsize(6).bold();
            ul.appendChild(winner);
            let loser = document.createElement("li");
            loser.innerHTML = "失败者".fontcolor("red").fontsize("5") + "<br>" + randarr[randarr.length - 1].fontsize(6).bold();
            ul.appendChild(loser);
            get("#game-result").appendChild(ul);
            get("#game-result").classList.remove("hide");
        }
        setTimeout(() => { get("#game-go").disabled = false; }, 300);
    },800)
}
