function endGame() {
    console.log("end")
    var keys = Object.keys(gridOb)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        gridOb[key].uncovered = true
    }

    Output.updateNum()

    setTimeout(resetUI, 1000)
}

function resetUI() {
    container.innerHTML = ""
    document.getElementById("gameSelector").style.display = ""
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

    document.getElementById("gameSelector").style.display = "none"

    dim = options.dim

    refresh()

    createGrid()
    plantMines(options.mines)

    Output.updateNum()
}