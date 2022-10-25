class Tile {
    constructor(id) {
        this.id = id
        this.mine = false
        this.uncovered = false
        this.flagged = false
    }
}
var gridOb
function createGrid() {
    gridOb={}

    var ar = document.getElementsByClassName("singleTile")
    for (let i = 0; i < ar.length; i++) {
        const tile = ar[i];
        gridOb[tile.id] = new Tile(tile.id)
        
    }
}


function plantMines(num) {
    var newKeys = Object.keys(gridOb)
    for (let i = 0; i < num; i++) {
        var newI = randInt(0, newKeys.length-1),
            newId = newKeys[newI]

        newKeys.splice(newI, 1)

        gridOb[newId].mine = true
        
    }
}



createGrid()
plantMines(5)

Output.updateNum()