let myVar;
let s=0;
let lev;
let platno= document.getElementById("plat");
let rew=1050;
let x = document.getElementsByClassName("fields");
let corr=true;
let time= 25;
let end = false;
let end2=false;
let cl=3;
let name;

function start() {
    name=document.getElementById("in").value;
    if(s===1) {
        switch (lev) {
            case 1:
                myVar = setInterval(moves, 1000);
                break;
            case 2:
                myVar = setInterval(moves, 500);
                break;
            case 3:
                myVar = setInterval(moves, 50);
        }

        end2 = document.getElementById("check").checked;
        document.getElementById("plat").style.display="block";
        document.getElementById("gamess").style.display="none";
        let timer = setInterval(reward, 1000);
    }
    else {
        alert("MORATE UNETI TEZINU");
    }
}
function level(ev,ovo) {
    s=1;
    if(ev===1) {
        lev=1;
    }
    else if(ev===2) {
        lev=2;
    }
    else {
        lev=3;
    }
    document.getElementsByClassName("lev")[cl].style.backgroundColor="blue";
    if(cl===ev-1) {
        document.getElementsByClassName("lev")[cl].style.backgroundColor="blue";
        s=0;
        cl=3;
    }
    else {
        ovo.style.backgroundColor = "green";
        cl=ev-1;
    }

}

function reward() {
    if(time<=20) {
        if(corr===true) {
            rew = Math.round(((Math.random() * 1000) - 1));
            corr=false;
        }
        if(time<=10) {
            document.getElementsByClassName("fields")[rew].style.backgroundColor="blue";
            if(time===0) {
                document.getElementsByClassName("fields")[rew].style.backgroundColor="black";
                rew=1050;
                time = 20;
                corr = true;
            }
        }
    }
    time--;
}
for(let i=0;i<11;i++) {
    for (let j = 0; j < 100; j++) {
        let element = document.createElement("div");
        element.classList.add("fields");
        element.innerHTML = "" + i + j;
        platno.appendChild(element);
        if(i===10) {
            element.classList.add("visi");
        }
    }
}
function moves() {

    let i;
    for (i=0; i<=parts.length-1; i++) {

        Move(i);
    }
}

function myStopFunction() {
    clearInterval(myVar);
}

function Move( pos ) {

    if(pos===0) {
        colision();
    }
    wall(pos);
    moving(pos);
    if(pos === 0) {

        parts[pos + 1].next_position = parts[pos].current_position;
        let podud=parts[pos].top * 50 + parts[pos].left;
        if(podud===rew) {
            document.getElementsByClassName("fields")[rew].style.backgroundColor="red";
            rew=1050;
            update();
        }
    }
    else {
        if(pos=== parts.length-1) {
            parts[pos].current_position = parts[pos].next_position;
        }
        else {
            parts[pos + 1].next_position = parts[pos].current_position;
            parts[pos].current_position = parts[pos].next_position;
        }
    }
}
function colision() {
    for(let i=1;i<parts.length;i++) {
        if(parts[0].left === parts[i].left && parts[0].top===parts[i].top) {
            end=true;
            s=0;
            document.getElementById("inplat").style.display="block";
            console.log(parts[0].left + " " + parts[0].top);
            x[parts[0].left + (parts[0].top*50)].style.backgroundColor="red";
            document.getElementById("name").innerHTML=" THIS IS YOUR SCORE " + name + " " + sc;
            myStopFunction();
        }

    }
}
function change(event) {
    let struk= event.which ;
    switch(struk) {
        case 40:
            if(parts[0].current_position!== "top") {
                parts[0].current_position = "down";
                parts[0].next_position = "down";
            }
            break;
        case 38:
            if(parts[0].current_position!== "down") {
                parts[0].current_position="top";
                parts[0].next_position="top";
            }
            break;
        case 37:
            if(parts[0].current_position!== "right") {
                parts[0].current_position = "left";
                parts[0].next_position = "left";
            }
            break;
        case 39:
            if(parts[0].current_position!=="left") {
                parts[0].current_position = "right";
                parts[0].next_position = "right";
            }
            break;
    }
}
let sc=document.getElementById("sc").innerHTML;
function update() {
    ++sc;
    document.getElementById("sc").innerHTML=sc;
    let n= { current_position: "right", next_position:"right",left:15, top:0,number:15
    };
    if(parts[parts.length-1].current_position==="right") {
        n.left=parts[parts.length-1].left-1;
        n.top=parts[parts.length-1].top;
        n.current_position="right";
        n.number=parts[parts.length-1].number+1;

    }
    if(parts[parts.length-1].current_position==="left") {
        n.left=parts[parts.length-1].left+1;
        n.top=parts[parts.length-1].top;
        n.current_position="left";
        n.number=parts[parts.length-1].number+1;

    }
    if(parts[parts.length-1].current_position==="top") {
        n.top=parts[parts.length-1].top+1;
        n.left=parts[parts.length-1].left;
        n.current_position="top";
        n.number=parts[parts.length-1].number+1;

    }
    if(parts[parts.length-1].current_position==="down") {
        n.top=parts[parts.length-1].top-1;
        n.left=parts[parts.length-1].left;
        n.current_position="down";
        n.number=parts[parts.length-1].number+1;
    }
    parts.push(n);
}


let same=true;
function startagain() {

    time=25;
    let niz=parts.length-1;
    for(let i=niz;i>=0;i--) {
        parts.splice(i);
    }
    let left= 15;
    let top=1;
    let number=0;
    for(let i=0;i<1000;i++) {
            document.getElementById("inplat").style.display="none";
            document.getElementsByClassName("fields")[i].style.backgroundColor="black";
    }
    for(let i = 0; i<15;i++) {
        let rest = {
            current_position: "right", next_position:"right",left:left, top:top,number:number
        };
        parts.push(rest);
        left--;
        number++;

    }
    end=false;
    sc=0;
    document.getElementById("sc").innerHTML=sc;
    if(same===true) {
        myVar = setInterval(moves, 50);
    }
    else {
        document.getElementById("plat").style.display="none";
        document.getElementById("gamess").style.display="block";
    }
}

function isteopcije() {
    same=true;
}
function meni() {
    same=false;
}

let parts= [];
let head = {
    current_position: "right", next_position:"right",left:21, top:1,number:0
};
let rest = {
    current_position: "right", next_position:"right",left:20, top:1,number:1
};
let rest2 = {
    current_position: "right", next_position:"right",left:19, top:1,number:2
};
let rest3 = {
    current_position: "right", next_position:"right",left:18, top:1,number:3
};
let rest4 = {
    current_position: "right", next_position:"right",left:17, top:1,number:4
};
let rest5 = {
    current_position: "right", next_position:"right",left:16, top:1,number:5
};
let rest6 = {
    current_position: "right", next_position:"right",left:15, top:1,number:6
};
let rest7 = {
    current_position: "right", next_position:"right",left:14, top:1,number:7
};
let rest8 = {
    current_position: "right", next_position:"right",left:13, top:1,number:8
};
let rest9 = {
    current_position: "right", next_position:"right",left:12, top:1,number:9
};
let rest10 = {
    current_position: "right", next_position:"right",left:11, top:1,number:10
};
let rest11 = {
    current_position: "right", next_position:"right",left:10, top:1,number:11
};
let rest12 = {
    current_position: "right", next_position:"right",left:9, top:1,number:12
};
let rest13 = {
    current_position: "right", next_position:"right",left:8, top:1,number:13
};
let rest14 = {
    current_position: "right", next_position:"right",left:7, top:1,number:14
};
let rest15 = {
    current_position: "right", next_position:"right",left:6, top:1,number:15
};
let rest16 = {
    current_position: "right", next_position:"right",left:5, top:1,number:16
};
let rest17 = {
    current_position: "right", next_position:"right",left:4, top:1,number:17
};
let rest18 = {
    current_position: "right", next_position:"right",left:3, top:1,number:18
};
let rest19 = {
    current_position: "right", next_position:"right",left:2, top:1,number:19
};
let rest20 = {
    current_position: "right", next_position:"right",left:1, top:1,number:20
};
let rest21 = {
    current_position: "right", next_position:"right",left:0, top:1,number:21
};
parts.push(head);
parts.push(rest);
parts.push(rest2);
parts.push(rest3);
parts.push(rest4);
parts.push(rest5);
parts.push(rest6);
parts.push(rest7);
parts.push(rest8);
parts.push(rest9);
parts.push(rest10);
parts.push(rest11);
parts.push(rest12);
parts.push(rest13);
parts.push(rest14);
parts.push(rest15);
parts.push(rest16);
parts.push(rest17);
parts.push(rest18);
parts.push(rest19);
parts.push(rest20);
parts.push(rest21);

function moving(pos) {

    if (parts[pos].current_position === "right" && end === false) {
        let before = parts[pos].top * 50 + parts[pos].left;
        if (parts[pos].left === -1) {
            x[before + 1].style.backgroundColor = "black";
        }
        else {
            if (pos === parts.length - 1) {
                let before = parts[pos].top * 50 + parts[pos].left;
                if (before === parts[0].top * 50 + parts[0].left) {
                    x[before].style.backgroundColor = "red";
                }
                else {
                    x[before].style.backgroundColor = "black";
                }
            }
        }
        let after;
        if (parts[pos].left === 50) {
            after = parts[pos].left++ + parts[pos].top * 50;
        }
        else {
            after = parts[pos].top * 50 + ++parts[pos].left;
        }
        x[after].style.backgroundColor = "red";
        x[after].innerHTML = " " + parts[pos].number;
    }
    if (parts[pos].current_position === "left" && end === false) {

        let before = parts[pos].top * 50 + parts[pos].left;
        if (before === parts[0].top * 50 + parts[0].left) {
            if (pos !== 0) {
                x[before].style.backgroundColor = "red";
            }
        }
        else {
            x[before].style.backgroundColor = "black";
        }
        let after;

        if (parts[pos].left === 0) {
            after = parts[pos].left-- + parts[pos].top * 50;

        }
        else {
            after = --parts[pos].left + parts[pos].top * 50;
        }
        x[after].style.backgroundColor = "red";
        x[after].innerHTML = " " + parts[pos].number;
    }
    if (parts[pos].current_position === "top" && end !== true) {
        let before = parts[pos].top * 50 + parts[pos].left;
        if (before === parts[0].top * 50 + parts[0].left) {
            x[before].style.backgroundColor = "red";
        }
        else {
            x[before].style.backgroundColor = "black";

        }
        let after = --parts[pos].top * 50 + parts[pos].left;
        x[after].style.backgroundColor = "red";
        x[after].innerHTML = " " + parts[pos].number;
    }
    if (parts[pos].current_position === "down" && end !== true) {
        if (parts[pos].top > -1) {
            let before = parts[pos].top * 50 + parts[pos].left;
            if (before === parts[0].top * 50 + parts[0].left) {
                x[before].style.backgroundColor = "red";
            }
            else {
                x[before].style.backgroundColor = "black";

            }
            let after = ++parts[pos].top * 50 + parts[pos].left;
            x[after].style.backgroundColor = "red";
            x[after].innerHTML = " " + parts[pos].number;
        }
        else {
            let after = ++parts[pos].top * 50 + parts[pos].left;
            x[after].style.backgroundColor = "red";
            x[after].innerHTML = " " + parts[pos].number;

        }
    }
}

function  wall(pos) {
    if (parts[pos].left === 0) {
        if (parts[pos].current_position === "left") {
            if(end2) {
                end=true;
                myStopFunction();
            }
            else {
                if(parts[0].top * 50 + parts[0].left===parts[parts.length-1].top * 50 + parts[parts.length-1].left) {
                    x[parts[pos].top * 50 + parts[pos].left].style.backgroundColor = "red";
                    parts[pos].left = 50;
                }
                else {
                    if(end!==true) {
                        x[parts[pos].top * 50 + parts[pos].left].style.backgroundColor = "black";
                        parts[pos].left = 50;
                    }

                }
            }
        }
    }
    if (parts[pos].left === 49) {

        if (parts[pos].current_position === "right") {
            if(end2) {
                end=true;
                myStopFunction();
            }
            else {
                if(parts[0].top * 50 + parts[0].left===parts[parts.length-1].top * 50 + parts[parts.length-1].left) {
                    x[parts[pos].top * 50 + parts[pos].left].style.backgroundColor = "red";
                    parts[pos].left = -1;
                }
                if(end!==true) {
                    x[parts[pos].top * 50 + (parts[pos].left)].style.backgroundColor = "black";
                    parts[pos].left = -1;
                }
            }
        }
    }
    if (parts[pos].top === 0) {
        if (parts[pos].current_position === "top") {
            if(end2) {
                end=true;
                myStopFunction();
            }
            else {
                if(parts[0].top * 50 + parts[0].left===parts[parts.length-1].top * 50 + parts[parts.length-1].left) {
                    x[parts[pos].top * 50 + parts[pos].left].style.backgroundColor = "red";
                    parts[pos].top = 20;
                }
                else {
                    if(end!==true) {
                        x[(parts[pos].top) * 50 + parts[pos].left].style.backgroundColor = "black";
                        parts[pos].top = 20;
                    }
                }
            }
        }
    }
    if (parts[pos].top === 19) {
        if (parts[pos].current_position === "down" ) {
            if(end2) {
                end=true;
                myStopFunction();
            }
            else {
                if(parts[0].top * 50 + parts[0].left===parts[parts.length-1].top * 50 + parts[parts.length-1].left) {
                    x[parts[pos].top * 50 + parts[pos].left].style.backgroundColor = "red";
                    parts[pos].top = -1;
                }
                else {
                    if(end!==true) {
                        x[(parts[pos].top) * 50 + parts[pos].left].style.backgroundColor = "black";
                        parts[pos].top = -1;
                    }
                }
            }
        }
    }
}



