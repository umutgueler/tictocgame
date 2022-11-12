


const flexSwitchCheckPC=document.querySelector("#flexSwitchCheckPC")
const divGamebox = document.querySelector("#gameboxx");
const winModal = (document.getElementById('winModal'));












let gamer = "X"
let user;

let col;
let row;
let winLenght;
let maxC;


eventListener();

function eventListener() {
    document.addEventListener("click", deneme)
    document.addEventListener("click", startGame)
    document.addEventListener("click", changeStatus)
    winModal.addEventListener('hidden.bs.modal', gameReset)
}
function deneme(e){
    console.log(e.target.id==="flexSwitchCheckPC")
    console.log()
}
function gameReset(){
    gameArray=[];
    gameInArray=[];
    const colDiv = document.querySelectorAll(".gamebox");


    colDiv.forEach(item => {
        item.className = "col gamebox free"
        item.innerHTML=""
    })
    gamer="X";
    document.querySelector("#nextGamer").innerHTML=`Gamer: ${gamer}`

}

function startGame(e) {





    if (e.target.className.includes("rowcol")) {
        const dropDownColums = document.querySelector("#dropDownColums");

        col = dropDownColums.options[dropDownColums.selectedIndex].text;

        const dropDownRow = document.querySelector("#dropDownRow");
        row = dropDownRow.options[dropDownRow.selectedIndex].text;

        minC = Math.min(col, row)


        const dropDownLenght = document.querySelector("#dropDownLenght");
        dropDownLenght.innerHTML = ""
        for (let i = 2; i <= minC; i++) {
            const option = document.createElement("option");
            option.innerText = i;

            dropDownLenght.appendChild(option)


        }





    }
    else if (e.target.id === "btnPlay" ) {

        try {
            
            winLenght = dropDownLenght.options[dropDownLenght.selectedIndex].text;

            loadBoxUI(col, row)
        }
        catch {
            alert("Please check value")
        }


    }






}


function changeStatus(e) {


    if (e.target.className === "col gamebox free") {
        e.target.className = "col gamebox clicked";
        e.target.innerHTML = gamer;
        gamer == "X" ? gamer = "O" : gamer = "X"
        document.querySelector("#nextGamer").innerHTML=`Gamer: ${gamer}`

        user = "P"
        checkGameStatus(col, row, winLenght);
    }

}

function loadBoxUI(col, row) {
    divGamebox.innerHTML = ""


    let rowDiv;




    for (let i = 1; i <= col * row; i++) {
        if (i % col === 1) {
            rowDiv = document.createElement("div");
            rowDiv.className = "row "


        }

        const colDiv = document.createElement("div");
        colDiv.className = "col gamebox free";

        rowDiv.appendChild(colDiv);
        divGamebox.appendChild(rowDiv);



    }

    document.querySelector("#nextGamer").innerHTML=`Gamer: ${gamer}`



}

function checkGameStatus(col, row, winLenght) {
    maxC = Math.max(col, row)
    col = Number(col)
    row = Number(row)
    winLenght = Number(winLenght)


    const colDiv = document.querySelectorAll(".gamebox");
    const gameArray = [];
    let gameInArray = []




    colDiv.forEach((item, index) => {

        index = index % col

        gameInArray[index] = item.innerHTML



        if (gameInArray.length === col) {

            gameArray.push(gameInArray)
            gameInArray = []

        }




    })





    //Yatay kontrol
    gameArray.forEach(items => {
        let item = []


        for (let k = 0; k < (col - winLenght + 1); k++) {

            item = items.slice(k, k + winLenght)


            if (item.length >= winLenght) {

                isWin(item)
            }


        }


    })


    //dikey kontrol
    for (let i = 0; i < col; i++) {
        let items = []

        for (let j = 0; j < row; j++) {

            items.push(gameArray[j][i]);

        }

        for (let k = 0; k < (row - winLenght + 1); k++) {
            let item = [];
            item = items.slice(k, k + winLenght)

            if (item.length >= winLenght) {
                isWin(item);
            }

        }



    }

    //çapraz kontrol
    
    let cc = 0
    for (i = 0; i <= maxC - winLenght; i++) {
        let items = [];

        for (j = 0; j < row; j++) {

            
            if (gameArray[j][cc + j] != null) {
                items.push(gameArray[j][cc + j])
            }


        }
        cc = cc + 1

        for (let k = 0; k < (items.length - winLenght + 1); k++) {
            let item = [];

            item = items.slice(k, k + winLenght)


            if (item.length >= winLenght) {
                isWin(item);
            }
        }

    }
    let rr = 0
    for (i = 0; i <= maxC - winLenght; i++) {
        let items = [];

        for (j = 1; j < row; j++) {

            if (gameArray[j][j - rr] != null) {
                items.push(gameArray[j][j - rr])
            }



        }

        rr = rr + 1

        for (let k = 0; k < (items.length - winLenght + 1); k++) {
            let item = [];

            item = items.slice(k, k + winLenght)


            if (item.length >= winLenght) {
                isWin(item);
            }

        }

    }
    let dcc = 0
    for (i = 0; i <= maxC - winLenght; i++) {
        let items = []
        for (j = 0; j < row; j++) {

            if (gameArray[j][(col - j - 1 - dcc)] != null) {
                items.push(gameArray[j][col - j - 1 - dcc])
            }

        }

        dcc = dcc + 1;
        for (let k = 0; k < (items.length - winLenght + 1); k++) {
            let item = [];


            item = items.slice(k, k + winLenght)


            if (item.length >= winLenght) {
                isWin(item);
            }

        }

    }
    let drr = 0
    for (i = 0; i <= maxC - winLenght; i++) {
        let items = []
        for (j = 1; j < row; j++) {

            if (gameArray[j][(row - j - 1 - drr)] != null) {
                items.push(gameArray[j][row - j - 1 - drr])
            }

        }

        drr = drr - 1;
        for (let k = 0; k < (items.length - winLenght + 1); k++) {
            let item = [];


            item = items.slice(k, k + winLenght)


            if (item.length >= winLenght) {
                isWin(item);
            }
        }

    }
    let pc=flexSwitchCheckPC.checked;
    if(pc && user==="P"){
        gamePc();
    }

}




function gameOver() {
    
    document.querySelector("#nextGamer").innerHTML=""
    $('#winModal').modal('show');
    
}
    

function gamePc() {

    const colDiv = document.querySelectorAll(".gamebox.free");

    const randomIndex = Math.floor(Math.random() * colDiv.length);

    // get random item
    const item = colDiv[randomIndex];
    
    item.className = "col gamebox clicked";
    item.innerHTML = gamer
    gamer == "X" ? gamer = "O" : gamer = "X"
    document.querySelector("#nextGamer").innerHTML=`Gamer: ${gamer}`
    user = "PC"
    checkGameStatus(col, row, winLenght)


}

function isWin(item) {

    if (item[0] != "") {

        c = item[0];


        if (item.every((e, i) => e === c)) {
            document.querySelector("#modalwin").innerHTML = `${item[0]} win`

            gameOver();
        }
    }

}

