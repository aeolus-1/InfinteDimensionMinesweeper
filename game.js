var firstClick = true,
    removeFlaggedMines = true

function updateChecks() {
    removeFlaggedMines = document.getElementById("removeFlaggedMinesBox").checked
    Output.updateNum();

}

function endGame(gameResult=0) {
    console.log("end")
    var keys = Object.keys(gridOb)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        gridOb[key].uncovered = true
    }

    Output.updateNum()

    document.getElementById("overlay").childNodes[0].textContent = gameResult?"You Win!":"You Lost"
    document.getElementById("overlay").style.display = "";
    
}

function testForWin() {
    var correctsFlags = 0,
        cleanTiles = 0

    var keys = Object.keys(gridOb)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i],
            tile = gridOb[key]
        if (tile.flagged && tile.mine) correctsFlags += 1
        else if (tile.uncovered && !tile.mine) cleanTiles += 1
    }

    
    if (correctsFlags == mineNum && cleanTiles == Object.keys(gridOb).length-mineNum) {
        endGame(1)
    }
}

function resetUI() {
    container.innerHTML = ""
    document.getElementById("startButton").style.display = ""
    document.getElementById("endButton").style.display = "none"

    document.getElementById("overlay").style.display = "none";
    (["mineRange", "xRange", "yRange", "zRange", "wRange"]).forEach(id => {
        console.log(id)
        document.getElementById(id).disabled = false
    });

}
function startButtonClick() {
    startGame({
        mines:parseInt(mineRange.value),
       dim:[
        parseInt(xRange.value),
        parseInt(yRange.value),
        parseInt(zRange.value),
        parseInt(wRange.value),
           ]
   })
}

function startGame(options) {
    
    firstClick = true
    
    document.getElementById("startButton").style.display = "none"
    document.getElementById("endButton").style.display = ""


    dim = options.dim
    mineNum = options.mines

    refresh()

    createGrid()
    plantMines(options.mines)

    Output.updateNum();

    (["mineRange", "xRange", "yRange", "zRange", "wRange"]).forEach(id => {
        console.log(id)
        document.getElementById(id).disabled = true
    });
}